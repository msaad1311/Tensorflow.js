import 'bootstrap/dist/css/bootstrap.css'
import * as tf from '@tensorflow/tfjs'

document.getElementById("hello").innerHTML="Hello"

// using sequential model

const model = tf.sequential();
model.add(tf.layers.dense({units:1,inputShape:[1]}));

// Selecting the loss function
model.compile({loss:'meanSquaredError',optimizer:'adam'})

// creating the training data

const height = tf.tensor2d([6,5.8,6.2,5.1,5.5,5.7],[6,1]);
const width = tf.tensor2d([80,75,85,65,72,75],[6,1]);

// training the model

model.fit(height,width,{epochs:500,batchSize:2}).then(() => {
    model.predict(tf.tensor2d([6],[1,1])).print();
});