'use strict';

var WaveformData = require('../core.js');

/**
 * AudioBuffer-based WaveformData generator
 *
 * @param {Object.<{scale: Number, scale_adjuster: Number}>} options
 * @param {Function.<WaveformData>} callback
 * @returns {Function.<AudioBuffer>}
 */
module.exports = function getAudioDecoder(options, callback){
  var scale = options.scale;
  var scale_adjuster = options.scale_adjuster;

  return function onAudioDecoded(audio_buffer){
    var data_length = Math.floor(audio_buffer.length / scale);
    var offset = 20;
    var data_object = new DataView(new ArrayBuffer(offset + data_length * 2));
    var left_channel, right_channel;
    var min_value = Infinity, max_value = -Infinity, scale_counter = scale;
    var buffer_length = audio_buffer.length;

    data_object.setInt32(0, 1, true);   //version
    data_object.setUint32(4, 1, true);   //is 8 bit
    data_object.setInt32(8, audio_buffer.sampleRate, true);   //sample rate
    data_object.setInt32(12, scale, true);   //scale
    data_object.setInt32(16, data_length, true);   //length

    left_channel = audio_buffer.getChannelData(0);
    right_channel = audio_buffer.getChannelData(0);

    for (var i = 0; i < buffer_length; i++){
      var sample = (left_channel[i] + right_channel[i]) / 2 * scale_adjuster;

      if (sample < min_value){
        min_value = sample;
      }

      if (sample > max_value){
        max_value = sample;
      }

      if (--scale_counter === 0){
        data_object.setInt8(offset++, Math.floor(min_value));
        data_object.setInt8(offset++, Math.floor(max_value));
        min_value = Infinity; max_value = -Infinity; scale_counter = scale;
      }
    }

    callback(new WaveformData(data_object.buffer, WaveformData.adapters.arraybuffer));
  };
};