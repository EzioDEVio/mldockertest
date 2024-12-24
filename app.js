const express = require('express');
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs-node');
const he = require('he');

const app = express();
const port = process.env.PORT || 5000;

// Load your TensorFlow.js model
const modelPath = 'model/my_test_model';
let model;

tf.loadLayersModel(`file://${modelPath}/model.json`).then(loadedModel => {
  model = loadedModel;
  console.log('Model loaded successfully');
}).catch(err => console.error('Error loading model:', err));

app.use(bodyParser.json());

// Prediction endpoint
app.post('/predict', async (req, res) => {
  if (!model) {
    return res.status(500).send('Model not loaded yet');
  }

  try {
    const inputData = req.body.input;
    const tensor = tf.tensor(inputData);
    const prediction = await model.predict(tensor).array();
    res.json(prediction);
  } catch (error) {
    console.error(error);
    res.status(500).send(he.encode(error.message));
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
