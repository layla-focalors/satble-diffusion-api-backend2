from __future__ import absolute_import, division, print_function
# Import TensorFlow >= 1.10 and enable eager execution
import tensorflow as tf
# tf.enable_eager_execution()
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
import unicodedata
import re
import numpy as np
import os
import time
print(tf.__version__)#to check the tensorflow version

path_to_zip = tf.keras.utils.get_file(
  'kor-eng.zip', origin='http://download.tensorflow.org/data/kor-eng.zip', extract=True)
path_to_file = os.path.dirname(path_to_zip)+"/kor-eng/kor.txt"