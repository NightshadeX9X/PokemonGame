var Events;
(function (Events) {
    var Handler = /** @class */ (function () {
        function Handler() {
            this.events = [];
        }
        Handler.prototype.addEventListener = function (id, callback, priority) {
            if (priority === void 0) { priority = 0; }
            var idAlreadyExists = !!this.events.find(function (event) { return event.id === id; });
            this.events.push({ id: id, callback: callback, priority: priority });
            return idAlreadyExists;
        };
        Handler.prototype.dispatchEvent = function (id) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var events = this.events.filter(function (event) { return event.id === id; });
            var sorted = events.sort(function (a, b) { return b.priority - a.priority; });
            sorted.forEach(function (events) { return events.callback.apply(events, args); });
            return sorted.length;
        };
        Handler.prototype.removeEventListener = function (id) {
            var removeCount = this.events.filter(function (event) { return event.id === id; }).length;
            this.events = this.events.filter(function (event) { return event.id !== id; });
            return removeCount;
        };
        return Handler;
    }());
    Events.Handler = Handler;
})(Events || (Events = {}));
export default Events;
