import Time from 'Time';
import Patches from 'Patches';
import Instruction from 'Instruction';
import Materials from 'Materials';
import Textures from 'Textures';
import {
    getRandomTexture,
    setSparkARInterval,
    setSparkARTimeout,
} from './sparkARUtil';

/**
 * A reference to the user's display.
 */
const display = Materials.get('display');

/**
 * The current interval in the animation cycle.
 */
let currentInterval: number;

/**
 * The status of the animation cycle.
 */
let status: 'ready' | 'running' | 'finished' = 'ready';

/**
 * Starts the animation cycle.
 *
 * Shuffles through different convenience store pictures until a timeout is reached.
 */
const start = () => {
    status = 'running';
    currentInterval = setSparkARInterval(100, () => {
        const randomTexture = getRandomTexture();
        display.diffuse = Textures.get(randomTexture);
    });
    setSparkARTimeout(3000, stop);
};

/**
 * Stops the animation cycle.
 *
 * This displays current convenience store image as the result.
 */
const stop = () => {
    Time.clearInterval(currentInterval);
    Instruction.bind(true, 'tap_to_reply');
    status = 'finished';
};

/**
 * Resets the animation cycle.
 *
 * This brings the user back to the initial state of the filter.
 */
const reset = () => {
    Instruction.bind(false, 'tap_to_reply');
    Instruction.bind(true, 'tap_to_start');
    display.diffuse = Textures.get('WHICH_CVS');
    status = 'ready';
};

/**
 * Starts the filter.
 */
const init = () => {
    Instruction.bind(true, 'tap_to_start');

    Patches.getPulseValue('tap').subscribe(() => {
        Instruction.bind(false, 'tap_to_start');

        switch (status) {
            case 'ready':
                start();
            case 'running':
                return;
            case 'finished':
                reset();
        }
    });
};

init();
