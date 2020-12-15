import 'bootstrap/dist/css/bootstrap.css';
import * as tf from '@tensorflow/tfjs';
document.getElementById('hello').innerText = "Hello";

// We use a sequential model for linear regression
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// Select loss and optimizer for model
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Height and weight as the training data 
const height = tf.tensor2d([6, 5.8, 6.2, 5.1, 5.5, 5.7], [6, 1]);
const weight = tf.tensor2d([80, 75, 85, 65, 72, 75], [6, 1]);


// Training the model
model.fit(height, weight, {epochs: 500}).then(() => {
    // Use model to predict weight for height 6ft
    model.predict(tf.tensor2d([6], [1,1])).print();
});