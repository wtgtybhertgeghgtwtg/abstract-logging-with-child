import pino from 'pino';
import nullLogger from '../source/index.js';
import type {Logger} from '../source/index.js';

jest.mock('pino', () => ({
  __esModule: true,
  default: () => ({
    info: jest.fn(),
  }),
}));

describe('the null logger', () => {
  it('accepts all call signatures.', () => {
    nullLogger.child({someOtherBinding: 'some-other-binding'});

    nullLogger.fatal('This is a fatal message');
    nullLogger.fatal('This is a fatal message', 'with', 3, 'arguments');
    nullLogger.fatal({someKey: 'some-value'});
    nullLogger.fatal({someKey: 'some-value'}, 'This is a fatal message.');
    nullLogger.fatal(
      {someKey: 'some-value'},
      'This is a fatal message',
      'with',
      3,
      'arguments',
    );

    nullLogger.error('This is an error message');
    nullLogger.error('This is an error message', 'with', 3, 'arguments');
    nullLogger.error({someKey: 'some-value'});
    nullLogger.error({someKey: 'some-value'}, 'This is an error message.');
    nullLogger.error(
      {someKey: 'some-value'},
      'This is an error message',
      'with',
      3,
      'arguments',
    );

    nullLogger.warn('This is a warn message');
    nullLogger.warn('This is a warn message', 'with', 3, 'arguments');
    nullLogger.warn({someKey: 'some-value'});
    nullLogger.warn({someKey: 'some-value'}, 'This is a warn message.');
    nullLogger.warn(
      {someKey: 'some-value'},
      'This is a warn message',
      'with',
      3,
      'arguments',
    );

    nullLogger.info('This is an info message');
    nullLogger.info('This is an info message', 'with', 3, 'arguments');
    nullLogger.info({someKey: 'some-value'});
    nullLogger.info({someKey: 'some-value'}, 'This is an info message.');
    nullLogger.info(
      {someKey: 'some-value'},
      'This is an info message',
      'with',
      3,
      'arguments',
    );

    nullLogger.debug('This is a debug message');
    nullLogger.debug('This is a debug message', 'with', 3, 'arguments');
    nullLogger.debug({someKey: 'some-value'});
    nullLogger.debug({someKey: 'some-value'}, 'This is a debug message.');
    nullLogger.debug(
      {someKey: 'some-value'},
      'This is a debug message',
      'with',
      3,
      'arguments',
    );

    nullLogger.trace('This is a trace message');
    nullLogger.trace('This is a trace message', 'with', 3, 'arguments');
    nullLogger.trace({someKey: 'some-value'});
    nullLogger.trace({someKey: 'some-value'}, 'This is a trace message.');
    nullLogger.trace(
      {someKey: 'some-value'},
      'This is a trace message',
      'with',
      3,
      'arguments',
    );
  });

  it('returns itself as its own child.', () => {
    expect(nullLogger).toBe(
      nullLogger.child({irrelevantKey: 'irrelevant-value'}),
    );
  });

  it('can be used as a default parameter.', () => {
    const informativeMessage = 'This is an informative message.';

    function thatTakesALogger(logger: Logger = nullLogger): void {
      logger.info(informativeMessage);
    }

    thatTakesALogger();

    const realLogger = pino();
    thatTakesALogger(realLogger);
    expect(realLogger.info).toHaveBeenCalledWith(informativeMessage);
  });

  it('cannot be mutated.', () => {
    expect(() => {
      // @ts-expect-error
      delete nullLogger.info;
    }).toThrowError();

    expect(() => {
      // @ts-expect-error
      nullLogger.info = 'Something else.';
    }).toThrowError();

    expect(() => {
      // @ts-expect-error
      nullLogger.newProperty = 'Some new property.';
    }).toThrowError();
  });
});
