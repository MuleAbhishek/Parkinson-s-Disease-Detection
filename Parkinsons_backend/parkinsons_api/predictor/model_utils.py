import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.applications import VGG16, ResNet50
from tensorflow.keras.applications.vgg16 import preprocess_input as vgg_preprocess
from tensorflow.keras.preprocessing import image
import os

# Load your saved FC models
vgg_fc_model = load_model(os.path.join(os.path.dirname(__file__), 'models/vgg_model.h5'))
resnet_fc_model = load_model(os.path.join(os.path.dirname(__file__), 'models/resnet_model.h5'))
vgg_spiral_model = load_model(os.path.join(os.path.dirname(__file__), 'models/vgg_spiral_model.h5'))
resnet_spiral_model = load_model(os.path.join(os.path.dirname(__file__), 'models/resnet_spiral_model.h5'))

# Load base models for feature extraction
vgg_base = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
resnet_base = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def predict_parkinsons(img_path):
    img = preprocess_image(img_path)

    # Extract features from both models
    vgg_features = vgg_base.predict(vgg_preprocess(img)).reshape((1, -1))
    resnet_features = resnet_base.predict(img).reshape((1, -1))  # ResNet usually doesn't need custom preprocess

    # Predict using FC models
    vgg_pred = vgg_fc_model.predict(vgg_features)[0][0]
    resnet_pred = resnet_fc_model.predict(resnet_features)[0][0]

    avg_pred = (vgg_pred + resnet_pred) / 2

    return {
        "model": "MRI",
        "prediction": "Parkinson" if avg_pred >= 0.5 else "Healthy",
        "confidence": float(avg_pred),
        # "vgg_pred": float(vgg_pred),
        # "resnet_pred": float(resnet_pred)
    }

def predict_spiral(img_path):
    img = preprocess_image(img_path)

    vgg_features = vgg_base.predict(vgg_preprocess(img)).reshape((1, -1))
    resnet_features = resnet_base.predict(img).reshape((1, -1))

    vgg_pred = vgg_spiral_model.predict(vgg_features)[0][0]
    resnet_pred = resnet_spiral_model.predict(resnet_features)[0][0]

    avg_pred = (vgg_pred + resnet_pred) / 2

    return {
        "model": "Spiral",
        "prediction": "Parkinson" if avg_pred <= 0.5 else "Healthy",
        "confidence": float(avg_pred),
        # "vgg_pred": float(vgg_pred),
        # "resnet_pred": float(resnet_pred)
    }