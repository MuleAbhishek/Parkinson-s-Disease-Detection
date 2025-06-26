# Parkinson-s-Disease-Detection
This project is a full-stack application for detecting Parkinson's Disease from MRI and spiral images using deep learning models (VGG and ResNet). It consists of a Django backend for model inference and a Next.js frontend for user interaction.


Backend: Django (Parkinsons_backend)
Location: Parkinsons_backend/parkinsons_api/
Purpose: Serves API endpoints for MRI/spiral image analysis using VGG and ResNet models.
Models: Four .h5 files in predictor/models/:
vgg_model.h5, resnet_model.h5 (MRI)
vgg_spiral_model.h5, resnet_spiral_model.h5 (Spiral)
Core Logic: predictor/model_utils.py loads models and provides prediction functions.
Framework: Django (Python 3.10+ recommended)
