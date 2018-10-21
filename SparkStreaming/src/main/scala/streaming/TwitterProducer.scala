package streaming

import java.util.HashMap

import org.apache.kafka.clients.producer.{KafkaProducer, ProducerConfig, ProducerRecord}
import org.apache.spark.streaming.dstream.DStream
import org.apache.spark.streaming.twitter.TwitterUtils
import org.apache.spark.streaming.{Seconds, StreamingContext}
import org.apache.spark.{SparkConf, SparkContext}
import sentiment_analyzer.SentimentAnalyzer.detectSentiment
import twitter4j.Status


object TwitterProducer {
  def main(args: Array[String]) {

    import Utils._
	
    if (args.length < 2) {
      System.out.println("Usage: TwitterProducer1 <KafkaTopic> <keyword1>")
      return
    }

    val sentimentTopic = args(0).toString
    val negativeTopic = args(1).toString
    val neutralTopic = args(2).toString
    val positiveTopic = args(3).toString
    val filters = args.slice(4, args.length)
    val kafkaBrokers = "localhost:9092,localhost:9093"

    val sparkConfiguration = new SparkConf().
      setAppName("spark-twitter-stream-example").
      setMaster(sys.env.get("spark.master").getOrElse("local[*]"))

    val sparkContext = new SparkContext(sparkConfiguration)
    sparkContext.setLogLevel("ERROR")

    val streamingContext = new StreamingContext(sparkContext, Seconds(5))

    val tweets: DStream[Status] =
    TwitterUtils.createStream(streamingContext, None, filters)

    val textAndSentences: DStream[(TweetText,Sentence)] =
    tweets.filter(x => x.getLang == "en").
      map(_.getText).
      map(tweetText => (tweetText, wordsOf(tweetText)))

    textAndSentences.print()

    textAndSentences.foreachRDD( rdd => {

      rdd.foreachPartition( partition => {
        val props = new HashMap[String, Object]()
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaBrokers)
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,
          "org.apache.kafka.common.serialization.StringSerializer")
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,
          "org.apache.kafka.common.serialization.StringSerializer")
        val producer = new KafkaProducer[String, String](props)
        partition.foreach( record => {
          val data = record.toString
          val sentiment = detectSentiment(data)
          val sentimentToSend = new ProducerRecord[String, String](sentimentTopic, null,sentiment )
          producer.send(sentimentToSend)
          if(sentiment == "1"){
            val message = new ProducerRecord[String, String](negativeTopic, null,data )
            producer.send(message)
          }
          if(sentiment == "3"){
            val message = new ProducerRecord[String, String](neutralTopic, null,data )
            producer.send(message)
          }
          if(sentiment == "5"){
            val message = new ProducerRecord[String, String](positiveTopic, null,data )
            producer.send(message)
          }

        } )
        producer.close()
      })

    })

    streamingContext.start()

    streamingContext.awaitTermination()
  }

}
