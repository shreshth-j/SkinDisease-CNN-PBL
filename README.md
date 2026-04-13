# Skin Disease Classification System
### CNN-Based Automated Skin Lesion Detection using Transfer Learning
> PBL-2 Project | Department of Computer Science & Engineering | Manipal University Jaipur | 2025–2026

---

## Overview

This project implements an automated skin disease classification system using Transfer Learning on pre-trained deep convolutional neural network architectures. The system classifies dermoscopic and clinical skin images into **six disease categories** and serves predictions through a Flask REST API connected to a responsive web frontend.

The project is developed in two phases. Phase 1 (current) delivers a fully functional end-to-end prediction pipeline. Phase 2 will expand the system into a patient advisory tool with clinical guidance and triage alerts.

---

## Team

| Name | Registration No. | Role |
|---|---|---|
| Shreshth Juneja | 2427030246 | Model development, API backend, training pipeline |
| Devaanshee Agarwal | 2427030504 | Dataset curation, frontend, documentation |

**Project Guide:** Mr. Arvind Mehta, Assistant Professor, CSE

---

## Disease Classes

| Code | Disease |
|---|---|
| ACK | Actinic Keratosis |
| BCC | Basal Cell Carcinoma |
| MEL | Melanoma |
| NEV | Melanocytic Nevus |
| SCC | Squamous Cell Carcinoma |
| SEK | Seborrhoeic Keratosis |

---

## Dataset

The model is trained on a **unified multi-source dataset** combining two publicly available corpora:

| Source | Type | Approx. Images |
|---|---|---|
| HAM10000 (ISIC Archive) | Dermoscopic | ~10,000 |
| Mendeley PAD-UFES-20 | Clinical / Smartphone | ~3,200 |
| **Total (post-augmentation)** | Combined | **~16,000+** |

Both datasets are merged under a standardised label taxonomy and split 80/20 for training and validation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Python 3.10+ |
| Deep Learning | TensorFlow 2.x / Keras |
| Model Backbone | EfficientNetB0 / MobileNetV2 (ImageNet weights) |
| Image Processing | OpenCV, NumPy |
| Data Handling | Pandas |
| Web Backend | Flask 3.x |
| Frontend | HTML5, Tailwind CSS, JavaScript |
| Version Control | Git / GitHub |

---

## Model Architecture

Transfer Learning is applied using a two-phase training protocol:

**Phase 1 — Head Training**
- Backbone layers frozen
- Only the custom classification head is trained
- 10 epochs, Adam optimizer, lr = 1×10⁻³

**Phase 2 — Fine-tuning**
- Top 30 backbone layers unfrozen
- Up to 30 epochs, lr = 1×10⁻⁴
- Callbacks: `EarlyStopping`, `ReduceLROnPlateau`, `ModelCheckpoint`

**Custom Classification Head:**
```
Global Average Pooling → Dropout (0.4) → Dense 256 (ReLU)
→ Batch Normalisation → Dropout (0.3) → Softmax (6 classes)
```

**Augmentation Pipeline:** Random rotation (±30°), horizontal/vertical flip, width/height shift (±15%), zoom (±20%), brightness variation, shear (±10°)

**Class Imbalance:** Addressed via inverse-frequency class-weight balancing during training.

---

## Results (Phase 1)

| Metric | Value |
|---|---|
| Validation Accuracy | **71.65%** |
| Number of Classes | 6 |
| Training Set Size | ~16,000+ (post-augmentation) |
| Loss Function | Categorical Cross-Entropy + Class Weights |
| Model Format | `.keras` (primary), `.h5` (compatibility) |

> This result is consistent with published state-of-the-art benchmarks of 68–75% for six-class dermatological classification tasks.

---

## Project Structure

```
SkinDisease-CNN-PBL/
│
├── skin_disease_cnn.py      # Model training script (two-phase Transfer Learning)
├── app.py                   # Flask REST API backend
├── predict.py               # Standalone inference script
├── index.html               # Frontend web interface
│
├── skin_disease_model.keras # Saved model (primary)
├── skin_disease_model.h5    # Saved model (compatibility)
├── labels.npy               # Class label array
│
└── datasets/
    ├── images/              # Mendeley PAD-UFES-20 images
    │   ├── imgs_part_1/
    │   ├── imgs_part_2/
    │   ├── imgs_part_3/
    │   └── metadata.csv
    ├── HAM10000_images/     # HAM10000 images
    └── HAM10000_metadata.csv
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Serves the frontend UI |
| `GET` | `/health` | Returns model status and loaded classes |
| `POST` | `/predict` | Accepts an image upload, returns top-3 predictions with confidence scores |

**Sample Response (`/predict`):**
```json
{
  "prediction": "MEL",
  "prediction_name": "Melanoma",
  "confidence": 0.8741,
  "top3": [
    { "code": "MEL", "name": "Melanoma", "confidence": 0.8741 },
    { "code": "NEV", "name": "Melanocytic Nevus", "confidence": 0.0893 },
    { "code": "BCC", "name": "Basal Cell Carcinoma", "confidence": 0.0261 }
  ]
}
```

---

## Running the Project

**1. Install dependencies**
```bash
pip install tensorflow flask opencv-python numpy pandas
```

**2. Train the model** *(skip if using the pre-trained `.keras` file)*
```bash
python skin_disease_cnn.py
```

**3. Start the API server**
```bash
python app.py
```

**4. Open the frontend**

Navigate to `http://127.0.0.1:5001` in your browser.

**5. Run a standalone prediction**
```bash
python predict.py path/to/image.jpg
```

---

## Phase 2 — Planned Improvements

- **Patient Advisory Interface:** Per-prediction panels with plain-language disease descriptions and patient-facing Dos and Don'ts
- **Triage Triggers:** Automatic consultation alerts for high-confidence malignant predictions (MEL, BCC, SCC)
- **Model Enhancements:** Ensemble methods, Grad-CAM saliency visualisation for interpretability
- **Cloud Deployment:** Docker containerisation and deployment to AWS / GCP / Render
- **Mobile Support:** Responsive design overhaul for full smartphone browser compatibility

---

## References

1. Esteva, A. et al. (2017). Dermatologist-level classification of skin cancer with deep neural networks. *Nature*, 542, 115–118.
2. Tschandl, P. et al. (2018). The HAM10000 dataset. *Scientific Data*, 5, 180161.
3. Pacheco, A.G. et al. (2020). PAD-UFES-20: A skin lesion dataset from smartphones. *Data in Brief*, 32, 106221.
4. Tan, M. & Le, Q. (2019). EfficientNet: Rethinking Model Scaling for CNNs. *ICML 2019*.
5. Sandler, M. et al. (2018). MobileNetV2: Inverted Residuals and Linear Bottlenecks. *CVPR 2018*.

---

*Manipal University Jaipur — Department of Computer Science & Engineering — 2025–2026*
