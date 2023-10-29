import numpy as np
from flask import Flask, request, render_template , jsonify
import pickle
import os
import cv2

os.chdir('/Users/roaaammar/Desktop/My Projects/FlowerFind/flowers')

app = Flask(__name__)

#Load model 
with open("model.pkl", "rb") as file:
    model = pickle.load(file)

def predict_flower(image_path):
    # Read and preprocess the image
    img = cv2.imread(image_path)
    img = cv2.resize(img, (150, 150))
    img = img / 255.0  # Normalize pixel values
    img = img.reshape(1, 150, 150, 3)  # Reshape the image to match the model input shape
    print("test1")
    # Make a prediction
    prediction = model.predict(img)
    print("test2")
    # Get the predicted flower category
    predicted_class = np.argmax(prediction)
    
    # Decode the predicted class to get the flower name
    class_labels = ['Daisy', 'Dandelion', 'Rose', 'Sunflower', 'Tulip']
    predicted_flower = class_labels[predicted_class]
    
    return predicted_flower


@app.route('/')
def home(): 
    return render_template('home.html')


@app.route('/profile')
def profile(): 
    return render_template('profile.html')

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/predict',methods=['POST'])
def predict():

    output = predict_flower("flowers/flowers/daisy/4955671608_8d3862db05_n.jpg")
    return jsonify(output)

    # return render_template('home.html', prediction_text='Your flower is {}'.format(output))



if __name__ == "__main__":
    app.run(debug=True)


