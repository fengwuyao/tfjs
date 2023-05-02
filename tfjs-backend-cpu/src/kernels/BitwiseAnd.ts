/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {BitwiseAnd, KernelConfig} from '@tensorflow/tfjs-core';

import {createSimpleBinaryKernelImpl} from '../utils/binary_impl';
import {binaryKernelFunc} from '../utils/binary_utils';

export const bitwiseAndImpl =
    createSimpleBinaryKernelImpl(((a: number, b: number) => {
      let res = 0;
      for (let i = 0; i < 32; i++) {
        if ((a & (1 << i)) && (b & (1 << i))) {
          res |= (1 << i);
        }
      }
      return res;
    }));

export const bitwiseAnd = binaryKernelFunc(BitwiseAnd, bitwiseAndImpl);

export const bitwiseAndConfig: KernelConfig = {
  kernelName: BitwiseAnd,
  backendName: 'cpu',
  kernelFunc: bitwiseAnd
};
