import "bootstrap/dist/css/bootstrap.css"
import * as tf from "@tensorflow/tfjs"
document.getElementById("hello").innerHTML = "Hello"

const Xtrain =[78,70.06,70,74.64,73.9,76.32,72.98,8.58]
const ytrain =[7855,7359,7705,7614,8347,8619,7356,1587]

// building the model

const m = tf.variable(tf.scalar(Math.random()))
const b = tf.variable(tf.scalar(Math.random()))

console.log("weight1"+m);
console.log('bias1'+b);

function predict(x){
    return tf.tidy(() => {
        return m.mul(x).add(b)
    });
}

// training

function loss(predictions,labels){
    return predictions.sub(labels).square().mean();
}

const learingRate = 0.0001;
const optimizer = tf.train.sgd(learingRate)

const numIterations = 1000
const errors =[]

for (let iter=0;iter<numIterations;iter++){
    optimizer.minimize(()=>{
        const predsYs = predict(Xtrain);
        const e = loss(predsYs,ytrain);
        errors.push(e.dataSync());
        return e
    });
}

// Making predictions

console.log(errors[0])
console.log(errors[errors.length - 1])

const Xtest = tf.tensor1d([67,87.8,67,75.12,82.84,73])
const ytest = tf.tensor1d([7160,8962,7383,7961,8444,7828])

const predictions = predict(Xtest)
var error = tf.losses.meanSquaredError(ytest,predictions)

console.log("mean squared error is" + error);
console.log("weight1"+m);
console.log("bias1"+b);