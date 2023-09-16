import Time from 'Time';

/**
 * Each texture represents the name of an image that can be displayed on the screen.
 *
 * In this case, they are the names of different Korean convenience stores.
 */
export const textures = ['7ELEVEN', 'EMART', 'GS', 'MINISTOP', 'CU'] as const;

/**
 * Selects a random image and applies it to a Texture.
 *
 * see {@link module: Texture}, on the screen.
 */
export const getRandomTexture = () => {
    let randomNumber = getRandomNumber(0, textures.length);
    return textures[randomNumber];
};

/**
 * Creates a timeout using SparkAR's TimeModule, see {@link module: Time}.
 *
 * Similar to ECMA's `setTimeout`, a callback function is called when the timeout is reached.
 *
 * @param timeoutSeconds - The time in seconds until the timeout callback is executed.
 * @param onTimeout = The callback function to call when the timeout is reached.
 */
export const setSparkARTimeout = (
    timeoutSeconds: number,
    onTimeout: () => void
) => {
    Time.setTimeout(() => {
        onTimeout();
    }, timeoutSeconds);
};

/**
 *
 * Creates an interval using SparkAR's TimeModule, see {@link module: Time}.
 *
 * Similar to ECMA's `setInterval`, a callback function is called when each interval completes.
 *
 * @param intervalSeconds - The duration of each interval.
 * @param onInterval - A callback function to execute at the conclusion of each interval.
 *
 * @returns - The instance of the interval (useful for canceling).
 */
export const setSparkARInterval = (
    intervalSeconds: number,
    onInterval: () => void
) =>
    Time.setInterval(() => {
        onInterval();
    }, intervalSeconds);

/**
 * Selects a 'random' integer from a set range.
 *
 * @param min - The minimum integer in the range.
 * @param max - The maximum integer in the range.
 *
 * @returns A 'randomly' selected number.
 */
export const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);
