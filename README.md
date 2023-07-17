
(WIP) just hacking with this brain mnist dataset:

http://mindbigdata.com/opendb/

my models are still shitty yet (need better data processing probably), here's what god suggest:

```md
The two papers you mentioned propose different methods for processing and classifying EEG signals. Here's how you can modify your current data processing pipeline to align with each of these methods:

1. **Method from the first paper:**
   This paper proposes a combination of EEG signal processing techniques and deep learning models for the recognition of imagined speech signals. The EEG signals are preprocessed using the discrete wavelet transform to remove artifacts and retrieve feature information. Then, multilayer bidirectional recurrent neural networks are used for classification.

   To implement this approach, you would need to:

   - Apply a discrete wavelet transform to your EEG signals. This can be done using the PyWavelets library in Python. You would replace your normalization step with this.
   - Use a bidirectional recurrent neural network for classification. This can be done using libraries like TensorFlow or PyTorch. You would replace your current model with this.

2. **Method from the second paper:**
   This paper proposes a method that uses the Hilbert Huang transform to isolate the EEG signals into an energy–frequency–time spectrum, which is then used by a deep learning model to learn discriminative spectro-temporal patterns of the raw EEG signals.

   To implement this approach, you would need to:

   - Apply the Hilbert Huang transform to your EEG signals. This can be done using the PyHHT library in Python. You would replace your normalization step with this.
   - Use a one-dimensional convolutional neural network for classification. This can be done using libraries like TensorFlow or PyTorch. You would replace your current model with this.

Please note that these are high-level steps and the actual implementation might require additional steps based on the specifics of your dataset and the requirements of your project. Also, these methods might require a good understanding of signal processing and deep learning concepts. If you're not familiar with these concepts, you might need to spend some time learning about them before you can successfully implement these methods.
```

useful papers to build classifiers:

- https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9955721/
- https://link.springer.com/article/10.1007/s13369-022-07313-3

