var Scrollbar = window.Scrollbar;

function InvertDeltaPlugin() {
  Scrollbar.ScrollbarPlugin.apply(this, arguments);
}

InvertDeltaPlugin.prototype = Object.create(Scrollbar.ScrollbarPlugin.prototype);

InvertDeltaPlugin.prototype.transformDelta = function(delta, fromEvent) {
  if (this.shouldInvertDelta(fromEvent)) {
      return {
        x: delta.y,
        y: delta.x,
      };
  }
  return delta;
};

InvertDeltaPlugin.prototype.shouldInvertDelta = function(fromEvent) {
  return this.options.events.some(function(rule) {
    return fromEvent.type.match(rule);
  });
};

InvertDeltaPlugin.pluginName = 'invertDelta';
InvertDeltaPlugin.defaultOptions = {
  events: [],
};