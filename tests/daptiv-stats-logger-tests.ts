import { DaptivStatsLogger, DaptivStatsLoggerOpts } from '../src/daptiv-stats-logger';

describe('DaptivStatsLogger', () => {
    let statsLog: DaptivStatsLogger;
    let statsLogOpts: DaptivStatsLoggerOpts;
    let clientSpy;

    beforeEach(() => {
        clientSpy = jasmine.createSpyObj('clientSpy', ['timing', 'increment', 'decrement', 'gauge', 'histogram', 'close']);
        statsLogOpts = {client: clientSpy};
        statsLog = new DaptivStatsLogger(statsLogOpts);
    });

    it('gauge should call through to client.gauge', () => {
        let statKey = 'test.stat.key';
        let value = 29;

        statsLog.gauge(statKey, value);

        expect(clientSpy.gauge).toHaveBeenCalledWith(statKey, value, 1, []);
    });

    it('increment should call through to client.increment', () => {
        let statKey = 'test.stat.key';

        statsLog.increment(statKey);

        expect(clientSpy.increment).toHaveBeenCalledWith(statKey, 1, []);
    });

    it('timing should call through to client.timing', () => {
        let statKey = 'test.stat.key';
        let value = 37;

        statsLog.timing(statKey, value);

        expect(clientSpy.timing).toHaveBeenCalledWith(statKey, value, 1, []);
    });

    describe('when prefix option is provided', () => {
        const prefix = 'env.prefix';
        beforeEach(() => {
          statsLog = new DaptivStatsLogger({client: clientSpy, prefix: prefix});
        });

        it('should lowercase prefix and replace all non-alphanumeric characters (or . ) with _', () => {
            let statKey = 'key';

            statsLog = new DaptivStatsLogger({client: clientSpy, prefix: 'Environment.Prefix&format test'});
            statsLog.increment(statKey);

            expect(clientSpy.increment).toHaveBeenCalledWith(`environment.prefix_format_test.${statKey}`, 1, []);
        });

        it('gauge should prefix statKey with env statKey', () => {
            let statKey = 'test.stat.key';
            let value = 29;

            statsLog.gauge(statKey, value);

            expect(clientSpy.gauge).toHaveBeenCalledWith(`${prefix}.${statKey}`, value, 1, []);
        });

        it('increment should prefix statKey with env statKey', () => {
            let statKey = 'test.stat.key';

            statsLog.increment(statKey);

            expect(clientSpy.increment).toHaveBeenCalledWith(`${prefix}.${statKey}`, 1, []);
        });

        it('timing should prefix statKey with env statKey', () => {
            let statKey = 'test.stat.key';
            let value = 37;

            statsLog.timing(statKey, value);

            expect(clientSpy.timing).toHaveBeenCalledWith(`${prefix}.${statKey}`, value, 1, []);
        });
    });
});
