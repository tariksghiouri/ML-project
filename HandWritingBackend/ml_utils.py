import cv2
import typing
import numpy as np
import os

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


    
def predicttext(filename):
    
    directory="C:\\Users\\tarik\ML-project\\ML-project\\HandWritingBackend"
    imagePath=os.path.join(directory, filename)
    print("\n\n_______________"+ imagePath +"________________\n\n",)
    configsSmallPc = BaseModelConfigs.load("../HandWritingBackend/models/202301131202/configs.yaml")
    # configs = BaseModelConfigs.load("../HandWritingBackend/Models/sentence_recognition/202306301934/configs.yaml")
    model = ImageToWordModel(model_path=configsSmallPc.model_path, char_list=configsSmallPc.vocab)
    accum_cer, accum_wer = [], []
    image = cv2.imread(imagePath )

    prediction_text = model.predict(image)

    # cer = get_cer(prediction_text, "Hello wissal")
    # wer = get_wer(prediction_text, "Hello wissal")
    # print("Label:", "hello Tarik")
    print("Prediction: ", prediction_text)
    # print(f"CER: {cer}; WER: {wer}")

    # accum_cer.append(cer)
    # accum_wer.append(wer)

    # cv2.imshow(prediction_text, image)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    print(imagePath)
    
    # return prediction_text
    return prediction_text
    # print(f"Average CER: {np.average(accum_cer)}, Average WER: {np.average(accum_wer)}")


    

