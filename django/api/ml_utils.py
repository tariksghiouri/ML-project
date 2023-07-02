import cv2
import typing
import numpy as np

from mltu.inferenceModel import OnnxInferenceModel
from mltu.utils.text_utils import ctc_decoder, get_cer, get_wer
from mltu.transformers import ImageResizer
import pandas as pd
from tqdm import tqdm
from mltu.configs import BaseModelConfigs
class ImageToWordModel(OnnxInferenceModel):
    def __init__(self, char_list: typing.Union[str, list], *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.char_list = char_list

    def predict(self, image: np.ndarray):
        image = ImageResizer.resize_maintaining_aspect_ratio(image, *self.input_shape[:2][::-1])

        image_pred = np.expand_dims(image, axis=0).astype(np.float32)

        preds = self.model.run(None, {self.input_name: image_pred})[0]

        text = ctc_decoder(preds, self.char_list)[0]

        return text


    
def predicttext():
    
    configs = BaseModelConfigs.load("./sentence_recognition/models/202301131202/configs.yaml")
    model = ImageToWordModel(model_path=configs.model_path, char_list=configs.vocab)
    accum_cer, accum_wer = [], []
    image = cv2.imread("C:/Users/tarik/Desktop/Screenshot 2023-07-02 084433.jpg" )

    prediction_text = model.predict(image)

    # cer = get_cer(prediction_text, "Hello wissal")
    # wer = get_wer(prediction_text, "Hello wissal")
    # print("Label:", "hello Tarik")
    # print("Prediction: ", prediction_text)
    # print(f"CER: {cer}; WER: {wer}")

    # accum_cer.append(cer)
    # accum_wer.append(wer)

    # cv2.imshow(prediction_text, image)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    return prediction_text
    # print(f"Average CER: {np.average(accum_cer)}, Average WER: {np.average(accum_wer)}")


    
