tracer = (tx) => {
  const traceConfig = `{
    retVal: [],
    step: function (log, db) {
      this.retVal.push(log.getPC()+log.op.toString());
    },
    fault: function (log, db) {
      this.retVal.push("FAULT: " + JSON.stringify(log));
    },
    result: function (ctx, db) {
      return this.retVal;
    },
  }`;
  return debug.traceTransaction(tx, { tracer: traceConfig });
};
