import pickle
import numpy as np
from nltk.tokenize import word_tokenize
import warnings

warnings.filterwarnings("ignore")


def predict(question_id, input):
    model_path = "./static/models/trained_models/model_question" + str(question_id) + ".h5"
    with open(model_path, "rb") as file:
        model, model_word2vec = pickle.load(file)
    input = preprocces_input(input, model_word2vec)
    input = input.reshape(1, -1)
    pred = model.predict(input)
    result = pred[0]
    return result


def get_word_vector(tokens, model_word2vec):
    textvector = np.zeros((100,), dtype="float32")
    for token in tokens:
        try:
            textvector += model_word2vec.wv[token]
        except KeyError:
            continue
    return textvector


def preprocces_input(text, model_word2vec):
    text = text.lower()
    tokens = word_tokenize(text)
    textvector = get_word_vector(tokens, model_word2vec)
    return textvector
