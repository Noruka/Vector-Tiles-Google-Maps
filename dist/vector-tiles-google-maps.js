!function (t) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else { var i; i = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, i.Pbf = t() } }(function () { return function t(i, e, r) { function s(o, h) { if (!e[o]) { if (!i[o]) { var a = "function" == typeof require && require; if (!h && a) return a(o, !0); if (n) return n(o, !0); var u = new Error("Cannot find module '" + o + "'"); throw u.code = "MODULE_NOT_FOUND", u } var f = e[o] = { exports: {} }; i[o][0].call(f.exports, function (t) { var e = i[o][1][t]; return s(e ? e : t) }, f, f.exports, t, i, e, r) } return e[o].exports } for (var n = "function" == typeof require && require, o = 0; o < r.length; o++)s(r[o]); return s }({ 1: [function (t, i, e) { "use strict"; function r(t) { this.buf = ArrayBuffer.isView && ArrayBuffer.isView(t) ? t : new Uint8Array(t || 0), this.pos = 0, this.type = 0, this.length = this.buf.length } function s(t, i, e) { var r, s, n = e.buf; if (s = n[e.pos++], r = (112 & s) >> 4, s < 128) return o(t, r, i); if (s = n[e.pos++], r |= (127 & s) << 3, s < 128) return o(t, r, i); if (s = n[e.pos++], r |= (127 & s) << 10, s < 128) return o(t, r, i); if (s = n[e.pos++], r |= (127 & s) << 17, s < 128) return o(t, r, i); if (s = n[e.pos++], r |= (127 & s) << 24, s < 128) return o(t, r, i); if (s = n[e.pos++], r |= (1 & s) << 31, s < 128) return o(t, r, i); throw new Error("Expected varint not more than 10 bytes") } function n(t) { return t.type === r.Bytes ? t.readVarint() + t.pos : t.pos + 1 } function o(t, i, e) { return e ? 4294967296 * i + (t >>> 0) : 4294967296 * (i >>> 0) + (t >>> 0) } function h(t, i) { var e, r; if (t >= 0 ? (e = t % 4294967296 | 0, r = t / 4294967296 | 0) : (e = ~(-t % 4294967296), r = ~(-t / 4294967296), 4294967295 ^ e ? e = e + 1 | 0 : (e = 0, r = r + 1 | 0)), t >= 0x10000000000000000 || t < -0x10000000000000000) throw new Error("Given varint doesn't fit into 10 bytes"); i.realloc(10), a(e, r, i), u(r, i) } function a(t, i, e) { e.buf[e.pos++] = 127 & t | 128, t >>>= 7, e.buf[e.pos++] = 127 & t | 128, t >>>= 7, e.buf[e.pos++] = 127 & t | 128, t >>>= 7, e.buf[e.pos++] = 127 & t | 128, t >>>= 7, e.buf[e.pos] = 127 & t } function u(t, i) { var e = (7 & t) << 4; i.buf[i.pos++] |= e | ((t >>>= 3) ? 128 : 0), t && (i.buf[i.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), t && (i.buf[i.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), t && (i.buf[i.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), t && (i.buf[i.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), t && (i.buf[i.pos++] = 127 & t))))) } function f(t, i, e) { var r = i <= 16383 ? 1 : i <= 2097151 ? 2 : i <= 268435455 ? 3 : Math.ceil(Math.log(i) / (7 * Math.LN2)); e.realloc(r); for (var s = e.pos - 1; s >= t; s--)e.buf[s + r] = e.buf[s] } function d(t, i) { for (var e = 0; e < t.length; e++)i.writeVarint(t[e]) } function p(t, i) { for (var e = 0; e < t.length; e++)i.writeSVarint(t[e]) } function c(t, i) { for (var e = 0; e < t.length; e++)i.writeFloat(t[e]) } function l(t, i) { for (var e = 0; e < t.length; e++)i.writeDouble(t[e]) } function w(t, i) { for (var e = 0; e < t.length; e++)i.writeBoolean(t[e]) } function F(t, i) { for (var e = 0; e < t.length; e++)i.writeFixed32(t[e]) } function b(t, i) { for (var e = 0; e < t.length; e++)i.writeSFixed32(t[e]) } function v(t, i) { for (var e = 0; e < t.length; e++)i.writeFixed64(t[e]) } function g(t, i) { for (var e = 0; e < t.length; e++)i.writeSFixed64(t[e]) } function x(t, i) { return (t[i] | t[i + 1] << 8 | t[i + 2] << 16) + 16777216 * t[i + 3] } function V(t, i, e) { t[e] = i, t[e + 1] = i >>> 8, t[e + 2] = i >>> 16, t[e + 3] = i >>> 24 } function y(t, i) { return (t[i] | t[i + 1] << 8 | t[i + 2] << 16) + (t[i + 3] << 24) } function M(t, i, e) { for (var r = "", s = i; s < e;) { var n = t[s], o = null, h = n > 239 ? 4 : n > 223 ? 3 : n > 191 ? 2 : 1; if (s + h > e) break; var a, u, f; 1 === h ? n < 128 && (o = n) : 2 === h ? (a = t[s + 1], 128 === (192 & a) && (o = (31 & n) << 6 | 63 & a, o <= 127 && (o = null))) : 3 === h ? (a = t[s + 1], u = t[s + 2], 128 === (192 & a) && 128 === (192 & u) && (o = (15 & n) << 12 | (63 & a) << 6 | 63 & u, (o <= 2047 || o >= 55296 && o <= 57343) && (o = null))) : 4 === h && (a = t[s + 1], u = t[s + 2], f = t[s + 3], 128 === (192 & a) && 128 === (192 & u) && 128 === (192 & f) && (o = (15 & n) << 18 | (63 & a) << 12 | (63 & u) << 6 | 63 & f, (o <= 65535 || o >= 1114112) && (o = null))), null === o ? (o = 65533, h = 1) : o > 65535 && (o -= 65536, r += String.fromCharCode(o >>> 10 & 1023 | 55296), o = 56320 | 1023 & o), r += String.fromCharCode(o), s += h } return r } function S(t, i, e) { for (var r, s, n = 0; n < i.length; n++) { if (r = i.charCodeAt(n), r > 55295 && r < 57344) { if (!s) { r > 56319 || n + 1 === i.length ? (t[e++] = 239, t[e++] = 191, t[e++] = 189) : s = r; continue } if (r < 56320) { t[e++] = 239, t[e++] = 191, t[e++] = 189, s = r; continue } r = s - 55296 << 10 | r - 56320 | 65536, s = null } else s && (t[e++] = 239, t[e++] = 191, t[e++] = 189, s = null); r < 128 ? t[e++] = r : (r < 2048 ? t[e++] = r >> 6 | 192 : (r < 65536 ? t[e++] = r >> 12 | 224 : (t[e++] = r >> 18 | 240, t[e++] = r >> 12 & 63 | 128), t[e++] = r >> 6 & 63 | 128), t[e++] = 63 & r | 128) } return e } i.exports = r; var B = t("ieee754"); r.Varint = 0, r.Fixed64 = 1, r.Bytes = 2, r.Fixed32 = 5; var k = 4294967296, P = 1 / k; r.prototype = { destroy: function () { this.buf = null }, readFields: function (t, i, e) { for (e = e || this.length; this.pos < e;) { var r = this.readVarint(), s = r >> 3, n = this.pos; this.type = 7 & r, t(s, i, this), this.pos === n && this.skip(r) } return i }, readMessage: function (t, i) { return this.readFields(t, i, this.readVarint() + this.pos) }, readFixed32: function () { var t = x(this.buf, this.pos); return this.pos += 4, t }, readSFixed32: function () { var t = y(this.buf, this.pos); return this.pos += 4, t }, readFixed64: function () { var t = x(this.buf, this.pos) + x(this.buf, this.pos + 4) * k; return this.pos += 8, t }, readSFixed64: function () { var t = x(this.buf, this.pos) + y(this.buf, this.pos + 4) * k; return this.pos += 8, t }, readFloat: function () { var t = B.read(this.buf, this.pos, !0, 23, 4); return this.pos += 4, t }, readDouble: function () { var t = B.read(this.buf, this.pos, !0, 52, 8); return this.pos += 8, t }, readVarint: function (t) { var i, e, r = this.buf; return e = r[this.pos++], i = 127 & e, e < 128 ? i : (e = r[this.pos++], i |= (127 & e) << 7, e < 128 ? i : (e = r[this.pos++], i |= (127 & e) << 14, e < 128 ? i : (e = r[this.pos++], i |= (127 & e) << 21, e < 128 ? i : (e = r[this.pos], i |= (15 & e) << 28, s(i, t, this))))) }, readVarint64: function () { return this.readVarint(!0) }, readSVarint: function () { var t = this.readVarint(); return t % 2 === 1 ? (t + 1) / -2 : t / 2 }, readBoolean: function () { return Boolean(this.readVarint()) }, readString: function () { var t = this.readVarint() + this.pos, i = M(this.buf, this.pos, t); return this.pos = t, i }, readBytes: function () { var t = this.readVarint() + this.pos, i = this.buf.subarray(this.pos, t); return this.pos = t, i }, readPackedVarint: function (t, i) { var e = n(this); for (t = t || []; this.pos < e;)t.push(this.readVarint(i)); return t }, readPackedSVarint: function (t) { var i = n(this); for (t = t || []; this.pos < i;)t.push(this.readSVarint()); return t }, readPackedBoolean: function (t) { var i = n(this); for (t = t || []; this.pos < i;)t.push(this.readBoolean()); return t }, readPackedFloat: function (t) { var i = n(this); for (t = t || []; this.pos < i;)t.push(this.readFloat()); return t }, readPackedDouble: function (t) { var i = n(this); for (t = t || []; this.pos < i;)t.push(this.readDouble()); return t }, readPackedFixed32: function (t) { var i = n(this); for (t = t || []; this.pos < i;)t.push(this.readFixed32()); return t }, readPackedSFixed32: function (t) { var i = n(this); for (t = t || []; this.pos < i;)t.push(this.readSFixed32()); return t }, readPackedFixed64: function (t) { var i = n(this); for (t = t || []; this.pos < i;)t.push(this.readFixed64()); return t }, readPackedSFixed64: function (t) { var i = n(this); for (t = t || []; this.pos < i;)t.push(this.readSFixed64()); return t }, skip: function (t) { var i = 7 & t; if (i === r.Varint) for (; this.buf[this.pos++] > 127;); else if (i === r.Bytes) this.pos = this.readVarint() + this.pos; else if (i === r.Fixed32) this.pos += 4; else { if (i !== r.Fixed64) throw new Error("Unimplemented type: " + i); this.pos += 8 } }, writeTag: function (t, i) { this.writeVarint(t << 3 | i) }, realloc: function (t) { for (var i = this.length || 16; i < this.pos + t;)i *= 2; if (i !== this.length) { var e = new Uint8Array(i); e.set(this.buf), this.buf = e, this.length = i } }, finish: function () { return this.length = this.pos, this.pos = 0, this.buf.subarray(0, this.length) }, writeFixed32: function (t) { this.realloc(4), V(this.buf, t, this.pos), this.pos += 4 }, writeSFixed32: function (t) { this.realloc(4), V(this.buf, t, this.pos), this.pos += 4 }, writeFixed64: function (t) { this.realloc(8), V(this.buf, t & -1, this.pos), V(this.buf, Math.floor(t * P), this.pos + 4), this.pos += 8 }, writeSFixed64: function (t) { this.realloc(8), V(this.buf, t & -1, this.pos), V(this.buf, Math.floor(t * P), this.pos + 4), this.pos += 8 }, writeVarint: function (t) { return t = +t || 0, t > 268435455 || t < 0 ? void h(t, this) : (this.realloc(4), this.buf[this.pos++] = 127 & t | (t > 127 ? 128 : 0), void (t <= 127 || (this.buf[this.pos++] = 127 & (t >>>= 7) | (t > 127 ? 128 : 0), t <= 127 || (this.buf[this.pos++] = 127 & (t >>>= 7) | (t > 127 ? 128 : 0), t <= 127 || (this.buf[this.pos++] = t >>> 7 & 127))))) }, writeSVarint: function (t) { this.writeVarint(t < 0 ? 2 * -t - 1 : 2 * t) }, writeBoolean: function (t) { this.writeVarint(Boolean(t)) }, writeString: function (t) { t = String(t), this.realloc(4 * t.length), this.pos++; var i = this.pos; this.pos = S(this.buf, t, this.pos); var e = this.pos - i; e >= 128 && f(i, e, this), this.pos = i - 1, this.writeVarint(e), this.pos += e }, writeFloat: function (t) { this.realloc(4), B.write(this.buf, t, this.pos, !0, 23, 4), this.pos += 4 }, writeDouble: function (t) { this.realloc(8), B.write(this.buf, t, this.pos, !0, 52, 8), this.pos += 8 }, writeBytes: function (t) { var i = t.length; this.writeVarint(i), this.realloc(i); for (var e = 0; e < i; e++)this.buf[this.pos++] = t[e] }, writeRawMessage: function (t, i) { this.pos++; var e = this.pos; t(i, this); var r = this.pos - e; r >= 128 && f(e, r, this), this.pos = e - 1, this.writeVarint(r), this.pos += r }, writeMessage: function (t, i, e) { this.writeTag(t, r.Bytes), this.writeRawMessage(i, e) }, writePackedVarint: function (t, i) { this.writeMessage(t, d, i) }, writePackedSVarint: function (t, i) { this.writeMessage(t, p, i) }, writePackedBoolean: function (t, i) { this.writeMessage(t, w, i) }, writePackedFloat: function (t, i) { this.writeMessage(t, c, i) }, writePackedDouble: function (t, i) { this.writeMessage(t, l, i) }, writePackedFixed32: function (t, i) { this.writeMessage(t, F, i) }, writePackedSFixed32: function (t, i) { this.writeMessage(t, b, i) }, writePackedFixed64: function (t, i) { this.writeMessage(t, v, i) }, writePackedSFixed64: function (t, i) { this.writeMessage(t, g, i) }, writeBytesField: function (t, i) { this.writeTag(t, r.Bytes), this.writeBytes(i) }, writeFixed32Field: function (t, i) { this.writeTag(t, r.Fixed32), this.writeFixed32(i) }, writeSFixed32Field: function (t, i) { this.writeTag(t, r.Fixed32), this.writeSFixed32(i) }, writeFixed64Field: function (t, i) { this.writeTag(t, r.Fixed64), this.writeFixed64(i) }, writeSFixed64Field: function (t, i) { this.writeTag(t, r.Fixed64), this.writeSFixed64(i) }, writeVarintField: function (t, i) { this.writeTag(t, r.Varint), this.writeVarint(i) }, writeSVarintField: function (t, i) { this.writeTag(t, r.Varint), this.writeSVarint(i) }, writeStringField: function (t, i) { this.writeTag(t, r.Bytes), this.writeString(i) }, writeFloatField: function (t, i) { this.writeTag(t, r.Fixed32), this.writeFloat(i) }, writeDoubleField: function (t, i) { this.writeTag(t, r.Fixed64), this.writeDouble(i) }, writeBooleanField: function (t, i) { this.writeVarintField(t, Boolean(i)) } } }, { ieee754: 2 }], 2: [function (t, i, e) { e.read = function (t, i, e, r, s) { var n, o, h = 8 * s - r - 1, a = (1 << h) - 1, u = a >> 1, f = -7, d = e ? s - 1 : 0, p = e ? -1 : 1, c = t[i + d]; for (d += p, n = c & (1 << -f) - 1, c >>= -f, f += h; f > 0; n = 256 * n + t[i + d], d += p, f -= 8); for (o = n & (1 << -f) - 1, n >>= -f, f += r; f > 0; o = 256 * o + t[i + d], d += p, f -= 8); if (0 === n) n = 1 - u; else { if (n === a) return o ? NaN : (c ? -1 : 1) * (1 / 0); o += Math.pow(2, r), n -= u } return (c ? -1 : 1) * o * Math.pow(2, n - r) }, e.write = function (t, i, e, r, s, n) { var o, h, a, u = 8 * n - s - 1, f = (1 << u) - 1, d = f >> 1, p = 23 === s ? Math.pow(2, -24) - Math.pow(2, -77) : 0, c = r ? 0 : n - 1, l = r ? 1 : -1, w = i < 0 || 0 === i && 1 / i < 0 ? 1 : 0; for (i = Math.abs(i), isNaN(i) || i === 1 / 0 ? (h = isNaN(i) ? 1 : 0, o = f) : (o = Math.floor(Math.log(i) / Math.LN2), i * (a = Math.pow(2, -o)) < 1 && (o--, a *= 2), i += o + d >= 1 ? p / a : p * Math.pow(2, 1 - d), i * a >= 2 && (o++, a /= 2), o + d >= f ? (h = 0, o = f) : o + d >= 1 ? (h = (i * a - 1) * Math.pow(2, s), o += d) : (h = i * Math.pow(2, d - 1) * Math.pow(2, s), o = 0)); s >= 8; t[e + c] = 255 & h, c += l, h /= 256, s -= 8); for (o = o << s | h, u += s; u > 0; t[e + c] = 255 & o, c += l, o /= 256, u -= 8); t[e + c - l] |= 128 * w } }, {}] }, {}, [1])(1) });
function VectorTile(buffer, end) {
    this.layers = {};
    this._buffer = buffer;
    end = end || buffer.length;

    while (buffer.pos < end) {
        var val = buffer.readVarint(),
            tag = val >> 3;

        if (tag == 3) {
            var layer = this._readLayer();
            if (layer.length) {
                this.layers[layer.name] = layer;
            }
        } else {
            buffer.skip(val);
        }
    }
    this.parseGeometries();
}

VectorTile.prototype._readLayer = function () {
    var buffer = this._buffer,
        bytes = buffer.readVarint(),
        end = buffer.pos + bytes,
        layer = new VectorTileLayer(buffer, end);

    buffer.pos = end;
    return layer;
};

VectorTile.prototype.parseGeometries = function () {
    for (var key in this.layers) {
        var layer = this.layers[key];
        layer.parsedFeatures = [];
        var featuresLength = layer._features.length;
        for (var i = 0, len = featuresLength; i < len; i++) {
            var feature = layer.feature(i);
            feature.coordinates = feature.loadGeometry();
            layer.parsedFeatures.push(feature);
        }
    }
}
function VectorTileFeature(buffer, end, extent, keys, values) {
    this.properties = {};

    // Public
    this.extent = extent;
    this.type = 0;

    // Private
    this._buffer = buffer;
    this._geometry = -1;

    end = end || buffer.length;

    while (buffer.pos < end) {
        var val = buffer.readVarint(),
            tag = val >> 3;

        if (tag == 1) {
            this._id = buffer.readVarint();
        } else if (tag == 2) {
            var tagLen = buffer.readVarint(),
                tagEnd = buffer.pos + tagLen;

            while (buffer.pos < tagEnd) {
                var key = keys[buffer.readVarint()];
                var value = values[buffer.readVarint()];
                this.properties[key] = value;
            }
        } else if (tag == 3) {
            this.type = buffer.readVarint();
        } else if (tag == 4) {
            this._geometry = buffer.pos;
            buffer.skip(val);
        } else {
            buffer.skip(val);
        }
    }
}

VectorTileFeature.types = ['Unknown', 'Point', 'LineString', 'Polygon'];

VectorTileFeature.prototype.loadGeometry = function () {
    var buffer = this._buffer;
    buffer.pos = this._geometry;

    var bytes = buffer.readVarint(),
        end = buffer.pos + bytes,
        cmd = 1,
        length = 0,
        x = 0,
        y = 0,
        lines = [],
        line;

    while (buffer.pos < end) {
        if (!length) {
            var cmd_length = buffer.readVarint();
            cmd = cmd_length & 0x7;
            length = cmd_length >> 3;
        }

        length--;

        if (cmd === 1 || cmd === 2) {
            x += buffer.readSVarint();
            y += buffer.readSVarint();

            if (cmd === 1) {
                // moveTo
                if (line) {
                    lines.push(line);
                }
                line = [];
            }

            line.push(new Point(x, y));
        } else if (cmd === 7) {
            // closePolygon
            line.push(line[0].clone());
        } else {
            throw new Error('unknown command ' + cmd);
        }
    }

    if (line) lines.push(line);

    return lines;
};

VectorTileFeature.prototype.bbox = function () {
    var buffer = this._buffer;
    buffer.pos = this._geometry;

    var bytes = buffer.readVarint(),
        end = buffer.pos + bytes,

        cmd = 1,
        length = 0,
        x = 0,
        y = 0,
        x1 = Infinity,
        x2 = -Infinity,
        y1 = Infinity,
        y2 = -Infinity;

    while (buffer.pos < end) {
        if (!length) {
            var cmd_length = buffer.readVarint();
            cmd = cmd_length & 0x7;
            length = cmd_length >> 3;
        }

        length--;

        if (cmd === 1 || cmd === 2) {
            x += buffer.readSVarint();
            y += buffer.readSVarint();
            if (x < x1) x1 = x;
            if (x > x2) x2 = x;
            if (y < y1) y1 = y;
            if (y > y2) y2 = y;
        } else if (cmd !== 7) {
            throw new Error('unknown command ' + cmd);
        }
    }

    return [x1, y1, x2, y2];
};
function VectorTileLayer(buffer, end) {
    // Public
    this.version = 1;
    this.name = null;
    this.extent = 4096;
    this.length = 0;

    // Private
    this._buffer = buffer;
    this._keys = [];
    this._values = [];
    this._features = [];

    var val, tag;

    end = end || buffer.length;

    while (buffer.pos < end) {
        val = buffer.readVarint();
        tag = val >> 3;

        if (tag === 15) {
            this.version = buffer.readVarint();
        } else if (tag === 1) {
            this.name = buffer.readString();
        } else if (tag === 5) {
            this.extent = buffer.readVarint();
        } else if (tag === 2) {
            this.length++;
            this._features.push(buffer.pos);
            buffer.skip(val);
        } else if (tag === 3) {
            this._keys.push(buffer.readString());
        } else if (tag === 4) {
            this._values.push(this.readFeatureValue());
        } else {
            buffer.skip(val);
        }
    }
}

VectorTileLayer.prototype.readFeatureValue = function () {
    var buffer = this._buffer,
        value = null,
        bytes = buffer.readVarint(),
        end = buffer.pos + bytes,
        val, tag;

    while (buffer.pos < end) {
        val = buffer.readVarint();
        tag = val >> 3;

        if (tag == 1) {
            value = buffer.readString();
        } else if (tag == 2) {
            throw new Error('read float');
        } else if (tag == 3) {
            value = buffer.readDouble();
        } else if (tag == 4) {
            value = buffer.readVarint();
        } else if (tag == 5) {
            throw new Error('read uint');
        } else if (tag == 6) {
            value = buffer.readSVarint();
        } else if (tag == 7) {
            value = Boolean(buffer.readVarint());
        } else {
            buffer.skip(val);
        }
    }

    return value;
};

// return feature `i` from this layer as a `VectorTileFeature`
VectorTileLayer.prototype.feature = function (i) {
    if (i < 0 || i >= this._features.length) throw new Error('feature index out of bounds');

    this._buffer.pos = this._features[i];
    var end = this._buffer.readVarint() + this._buffer.pos;

    return new VectorTileFeature(this._buffer, end, this.extent, this._keys, this._values);
};
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype = {
    clone: function () { return new Point(this.x, this.y); },

    add: function (p) { return this.clone()._add(p); },
    sub: function (p) { return this.clone()._sub(p); },
    mult: function (k) { return this.clone()._mult(k); },
    div: function (k) { return this.clone()._div(k); },
    rotate: function (a) { return this.clone()._rotate(a); },
    matMult: function (m) { return this.clone()._matMult(m); },
    unit: function () { return this.clone()._unit(); },
    perp: function () { return this.clone()._perp(); },
    round: function () { return this.clone()._round(); },

    mag: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    equals: function (p) {
        return this.x === p.x &&
            this.y === p.y;
    },

    dist: function (p) {
        return Math.sqrt(this.distSqr(p));
    },

    distSqr: function (p) {
        var dx = p.x - this.x,
            dy = p.y - this.y;
        return dx * dx + dy * dy;
    },

    angle: function () {
        return Math.atan2(this.y, this.x);
    },

    angleTo: function (b) {
        return Math.atan2(this.y - b.y, this.x - b.x);
    },

    angleWith: function (b) {
        return this.angleWithSep(b.x, b.y);
    },

    // Find the angle of the two vectors, solving the formula for the cross product a x b = |a||b|sin(θ) for θ.
    angleWithSep: function (x, y) {
        return Math.atan2(
            this.x * y - this.y * x,
            this.x * x + this.y * y);
    },

    _matMult: function (m) {
        var x = m[0] * this.x + m[1] * this.y,
            y = m[2] * this.x + m[3] * this.y;
        this.x = x;
        this.y = y;
        return this;
    },

    _add: function (p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    },

    _sub: function (p) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    },

    _mult: function (k) {
        this.x *= k;
        this.y *= k;
        return this;
    },

    _div: function (k) {
        this.x /= k;
        this.y /= k;
        return this;
    },

    _unit: function () {
        this._div(this.mag());
        return this;
    },

    _perp: function () {
        var y = this.y;
        this.y = this.x;
        this.x = -y;
        return this;
    },

    _rotate: function (angle) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            x = cos * this.x - sin * this.y,
            y = sin * this.x + cos * this.y;
        this.x = x;
        this.y = y;
        return this;
    },

    _round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
};

// constructs Point from an array if necessary
Point.convert = function (a) {
    if (a instanceof Point) {
        return a;
    }
    if (Array.isArray(a)) {
        return new Point(a[0], a[1]);
    }
    return a;
};
MERCATOR = {
    fromLatLngToPoint: function (latLng) {
        var siny = Math.min(Math.max(Math.sin(latLng.lat() * (Math.PI / 180)),
            -.9999),
            .9999);
        return {
            x: 128 + latLng.lng() * (256 / 360),
            y: 128 + 0.5 * Math.log((1 + siny) / (1 - siny)) * -(256 / (2 * Math.PI))
        };
    },

    fromPointToLatLng: function (point) {
        return {
            lat: (2 * Math.atan(Math.exp((point.y - 128) / -(256 / (2 * Math.PI)))) -
                Math.PI / 2) / (Math.PI / 180),
            lng: (point.x - 128) / (256 / 360)
        };
    },

    getTileAtLatLng: function (latLng, zoom) {
        var t = Math.pow(2, zoom),
            s = 256 / t,
            p = this.fromLatLngToPoint(latLng);
        return {
            x: Math.floor(p.x / s),
            y: Math.floor(p.y / s),
            z: zoom
        };
    },

    getTileBounds: function (tile) {
        tile = this.normalizeTile(tile);
        var t = Math.pow(2, tile.z),
            s = 256 / t,
            sw = {
                x: tile.x * s,
                y: (tile.y * s) + s
            },
            ne = {
                x: tile.x * s + s,
                y: (tile.y * s)
            };
        return {
            sw: this.fromPointToLatLng(sw),
            ne: this.fromPointToLatLng(ne)
        }
    },

    normalizeTile: function (tile) {
        var t = Math.pow(2, tile.z);
        tile.x = ((tile.x % t) + t) % t;
        tile.y = ((tile.y % t) + t) % t;
        return tile;
    },

    fromLatLngToPixels: function (map, latLng) {
        var bounds = map.getBounds();
        var ne = bounds.getNorthEast();
        var sw = bounds.getSouthWest();
        var topRight = map.getProjection().fromLatLngToPoint(ne);
        var bottomLeft = map.getProjection().fromLatLngToPoint(sw);
        var scale = Math.pow(2, map.getZoom());
        var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
        return {
            x: (worldPoint.x - bottomLeft.x) * scale,
            y: (worldPoint.y - topRight.y) * scale
        }
    },

    fromLatLngToTilePoint: function (map, evt) {
        var zoom = map.getZoom();
        var tile = this.getTileAtLatLng(evt.latLng, zoom);
        var tileBounds = this.getTileBounds(tile);
        var tileSwLatLng = new google.maps.LatLng(tileBounds.sw);
        var tileNeLatLng = new google.maps.LatLng(tileBounds.ne);
        var tileSwPixels = this.fromLatLngToPixels(map, tileSwLatLng);
        var tileNePixels = this.fromLatLngToPixels(map, tileNeLatLng);
        return {
            x: evt.pixel.x - tileSwPixels.x,
            y: evt.pixel.y - tileNePixels.y
        }
    },

    // todo: sometimes it does not work properly
    isPointInPolygon: function (point, polygon) {
        if (polygon && polygon.length) {
            for (var c = false, i = -1, l = polygon.length, j = l - 1; ++i < l; j = i) {
                ((polygon[i].y <= point.y && point.y < polygon[j].y) || (polygon[j].y <= point.y && point.y < polygon[i].y))
                    && (point.x < (polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x)
                    && (c = !c);
            }
            return c;
        }
    },

    in_circle: function (center_x, center_y, radius, x, y) {
        var square_dist = Math.pow((center_x - x), 2) + Math.pow((center_y - y), 2);
        return square_dist <= Math.pow(radius, 2);
    },

    getDistanceFromLine: function (point, line) {
        var minDistance = Number.POSITIVE_INFINITY;
        if (line && line.length > 1) {
            for (var i = 0, l = line.length - 1; i < l; i++) {
                var distance = this.projectPointOnLineSegment(point, line[i], line[i + 1]);
                if (distance <= minDistance) {
                    minDistance = distance;
                }
            }
        }
        return minDistance;
    },

    projectPointOnLineSegment: function (point, r0, r1) {
        var x = point.x;
        var y = point.y;
        var x1 = r0.x;
        var y1 = r0.y;
        var x2 = r1.x;
        var y2 = r1.y;

        var A = x - x1;
        var B = y - y1;
        var C = x2 - x1;
        var D = y2 - y1;

        var dot = A * C + B * D;
        var len_sq = C * C + D * D;
        var param = -1;
        if (len_sq != 0) //in case of 0 length line
            param = dot / len_sq;

        var xx, yy;

        if (param < 0) {
            xx = x1;
            yy = y1;
        }
        else if (param > 1) {
            xx = x2;
            yy = y2;
        }
        else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }

        var dx = x - xx;
        var dy = y - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
/*
 *  Created by Jes�s Barrio on 04/2021
 */

class MVTFeature {
    constructor(mVTLayer, vectorTileFeature, tileContext, style) {
        this.tileContext = tileContext;
        this.mVTLayer = mVTLayer;
        this.selected = false;       
        this.extent = vectorTileFeature.extent;        
        this.divisor = this.extent / this.tileContext.tileSize;
        this.tiles = {};
        this.style = style;
        for (var key in vectorTileFeature) {
            this[key] = vectorTileFeature[key];
        }
        this.addTileFeature(vectorTileFeature, this.tileContext);
    }

    addTileFeature(vectorTileFeature, tileContext) {
        this.tiles[tileContext.id] = {
            vectorTileFeature: vectorTileFeature,
            paths: []
        };
    }

    setStyle(style) {
        this.style = style;
    }

    getPathsForTile(id) {
        return this.tiles[id].paths;
    }

    clearTiles(zoom) {
        for (var key in this.tiles) {
            if (key.split(":")[0] != zoom) {
                delete this.tiles[key];
            }
        }
    }

    redrawTiles() {
        for (var id in this.tiles) {
            this.mVTLayer.mVTSource.redrawTile(id);
        }
    }

    toggle() {
        if (this.selected) {
            this.deselect();
        } else {
            this.select();
        }
    }

    select() {
        this.selected = true;
        this.mVTLayer.mVTSource.featureSelected(this);
        this.redrawTiles();
    }

    deselect() {
        this.selected = false;
        this.mVTLayer.mVTSource.featureDeselected(this);
        this.redrawTiles();
    }

    draw(tileContext) {
        var vectorTileFeature = this.tiles[tileContext.id].vectorTileFeature;
        var style = this.style;
        if (this.selected && this.style.selected) {
            style = this.style.selected;
        }
        switch (vectorTileFeature.type) {
            case 1: //Point
                this._drawPoint(tileContext, vectorTileFeature.coordinates, style);
                break;

            case 2: //LineString
                this._drawLineString(tileContext, vectorTileFeature.coordinates, style);
                break;

            case 3: //Polygon
                this._drawPolygon(tileContext, vectorTileFeature.coordinates, style);
                break;
        }
    }

    _drawPoint(tileContext, coordinates, style) {
        var context2d = this._getContext2d(tileContext.canvas, style);
        var radio = style.radio || 3;
        context2d.beginPath();
        var point = this._getPoint(coordinates[0][0], tileContext);
        context2d.arc(point.x, point.y, radio, 0, Math.PI * 2);
        context2d.closePath();
        context2d.fill();
        context2d.stroke();
        this.tiles[tileContext.id].paths.push([point]);
    }

    _drawLineString(tileContext, coordinates, style) {
        var context2d = this._getContext2d(tileContext.canvas, style);
        var projCoords = this._drawCoordinates(tileContext, context2d, coordinates);
        context2d.stroke();
        this.tiles[tileContext.id].paths.push(projCoords);
    }

    _drawPolygon(tileContext, coordinates, style) {
        var context2d = this._getContext2d(tileContext.canvas, style);
        var projCoords = this._drawCoordinates(tileContext, context2d, coordinates);
        context2d.closePath();
        if (style.fillStyle) {
            context2d.fill();
        }

        if (style.strokeStyle) {
            context2d.stroke();
        }

        this.tiles[tileContext.id].paths.push(projCoords);
    }

    _drawCoordinates(tileContext, context2d, coordinates) {
        var projCoords = [];
        context2d.beginPath();
        for (var i = 0; i < coordinates.length; i++) {
            var coordinate = coordinates[i];
            for (var j = 0; j < coordinate.length; j++) {
                var method = (j === 0 ? 'move' : 'line') + 'To';
                var point = this._getPoint(coordinate[j], tileContext);                
                projCoords.push(point);
                context2d[method](point.x, point.y);
            }
        }
        return projCoords;
    }
    
    _getContext2d(canvas, style) {
        var context2d = canvas.getContext('2d');
        for (var key in style) {
            if (key === 'selected') {
                continue;
            }
            context2d[key] = style[key];
        }
        return context2d;
    }

    _getPoint(coords, tileContext) {
        var point =  {
            x: coords.x / this.divisor,
            y: coords.y / this.divisor
        };

        if (tileContext.parentId) {
            var parentTile = this.mVTLayer.mVTSource._getTile(tileContext.parentId);
            var currentTile = this.mVTLayer.mVTSource._getTile(tileContext.id);
            var zoomDistance = currentTile.zoom - parentTile.zoom;

            const scale = Math.pow(2, zoomDistance);

            let xScale = point.x * scale;
            let yScale = point.y * scale;

            let xtileOffset = currentTile.x % scale;
            let ytileOffset = currentTile.y % scale;

            point.x = xScale - (xtileOffset * this.tileContext.tileSize);
            point.y = yScale - (ytileOffset * this.tileContext.tileSize);
        }
        return point;
    }
}
/*
 *  Created by Jes�s Barrio on 04/2021
 */

class MVTLayer {
    constructor(mVTSource, options) {
        this.mVTSource = mVTSource;
        this._lineClickTolerance = 2;
        this._getIDForLayerFeature = options.getIDForLayerFeature;
        this.style = options.style;
        this.name = options.name;
        this._filter = options.filter || false;
        this._mVTFeatures = {};
        this._tileCanvas = [];
        this._features = {};
    }

    parseVectorTileLayer(vectorTileFeatures, tileContext) {
        this._tileCanvas[tileContext.id] = tileContext.canvas;
        this._mVTFeatures[tileContext.id] = [];
        for (var i = 0; i < vectorTileFeatures.length; i++) {
            var feature = vectorTileFeatures[i];
            this._parseVectorTileFeature(feature, tileContext, i);
        }
        this.drawTile(tileContext);
    }

    _parseVectorTileFeature(feature, tileContext, i) {
        if (this._filter && typeof this._filter === 'function') {
            if (this._filter(feature, tileContext) === false) {
                return;
            }
        }

        var featureId = this._getIDForLayerFeature(feature) || i;
        var mVTFeature = this._features[featureId];
        if (!mVTFeature) {
            var style = this.getStyle(feature);
            mVTFeature = new MVTFeature(this, feature, tileContext, style);
            this._features[featureId] = mVTFeature;
        } else {
            mVTFeature.addTileFeature(feature, tileContext);
        }

        this._mVTFeatures[tileContext.id].push(mVTFeature);
    }

    drawTile(tileContext) {
        var features = this._mVTFeatures[tileContext.id];
        if (!features) return;
        var selectedFeatures = [];
        for (var i = 0; i < features.length; i++) {
            var feature = features[i];
            if (feature.selected) {
                selectedFeatures.push(feature);
            } else {
                feature.draw(tileContext);
            }
        }
        for (var i = 0; i < selectedFeatures.length; i++) {
            selectedFeatures[i].draw(tileContext);
        }
    }

    deleteTile(id) {
        delete this._mVTFeatures[id];
        delete this._tileCanvas[id];
    }

    clearFeaturesAtNonVisibleZoom() {
        var zoom = this.mVTSource.map.getZoom();
        for (var featureId in this._features) {
            this._features[featureId].clearTiles(zoom);
        }
    }

    getCanvas(id) {
        return this._tileCanvas[id];
    }

    getStyle(feature) {
        if (typeof this.style === 'function') {
            return this.style(feature);
        }
        return this.style;
    }

    setStyle(style) {
        this.style = style;
        for (var featureId in this._features) {
            this._features[featureId].setStyle(style);
        }
    }

    setFilter(filter) {
        this._filter = filter;
    }

    handleClickEvent(event) {
        var canvas = this._tileCanvas[event.id];
        var features = this._mVTFeatures[event.id];
        if (!canvas || !features) {
            return event;
        }

        var minDistance = Number.POSITIVE_INFINITY;
        var selectedFeature = null;

        for (var i = 0; i < features.length; i++) {
            var feature = features[i];
            var paths = feature.getPathsForTile(event.id);
            for (var j = 0; j < paths.length; j++) {
                var path = paths[j];
                switch (feature.type) {
                    case 1: // Point
                        if (MERCATOR.in_circle(path[0].x, path[0].y, feature.style.radio, event.tilePoint.x, event.tilePoint.y)) {
                            selectedFeature = feature;
                            minDistance = 0;
                        }
                        break;
                    case 2: // LineString
                        var distance = MERCATOR.getDistanceFromLine(event.tilePoint, path);
                        var thickness = (feature.selected && feature.style.selected ? feature.style.selected.lineWidth : feature.style.lineWidth);
                        if (distance < thickness / 2 + this._lineClickTolerance && distance < minDistance) {
                            selectedFeature = feature;
                            minDistance = distance;
                        }
                        break;
                    case 3: // Polygon
                        if (MERCATOR.isPointInPolygon(event.tilePoint, path)) {
                            selectedFeature = feature;
                            minDistance = 0;
                        }
                        break;
                }
            }
            if (minDistance == 0) {
                break;
            }
        }
        event.feature = selectedFeature;
        return event;
    }
};
/*
 *  Created by Jes�s Barrio on 04/2021
 */

class MVTSource {
    constructor(map, options) {
        var self = this;
        this.map = map;
        this._url = options.url || ""; //Url TO Vector Tile Source,
        this._sourceMaxZoom = options.sourceMaxZoom || false; // Source maxzoom to enable overzoom
        this._debug = options.debug || false; // Draw tiles lines and ids
        this.getIDForLayerFeature = options.getIDForLayerFeature || function (feature) {
            return feature.properties.id || feature.properties.Id || feature.properties.ID;
        };
        this._visibleLayers = options.visibleLayers || false;  // List of visible layers
        this._xhrHeaders = options.xhrHeaders || {}; // Headers added to every url request
        this._clickableLayers = options.clickableLayers || false;   // List of layers that are clickable
        this._filter = options.filter || false; // Filter features
        this._cache = options.cache || false; // Load tiles in cache to avoid duplicated requests
        this._tileSize = options.tileSize || 256; // Default tile size
        this.tileSize = new google.maps.Size(this._tileSize, this._tileSize);
        this.style = options.style || function (feature) {
            var style = {};
            switch (feature.type) {
                case 1: //'Point'
                    style.fillStyle = 'rgba(49,79,79,1)';
                    style.radio = 5;
                    style.selected = {
                        fillStyle: 'rgba(255,255,0,0.5)',
                        radio: 6
                    }
                    break;
                case 2: //'LineString'
                    style.strokeStyle = 'rgba(136, 86, 167, 1)';
                    style.lineWidth = 3;
                    style.selected = {
                        strokeStyle: 'rgba(255,25,0,0.5)',
                        lineWidth: 4
                    }
                    break;
                case 3: //'Polygon'
                    style.fillStyle = 'rgba(188, 189, 220, 0.5)';
                    style.strokeStyle = 'rgba(136, 86, 167, 1)';
                    style.lineWidth = 1;
                    style.selected = {
                        fillStyle: 'rgba(255,140,0,0.3)',
                        strokeStyle: 'rgba(255,140,0,1)',
                        lineWidth: 2
                    }
                    break;
            }
            return style;
        };

        this.mVTLayers = {};  //Keep a list of the layers contained in the PBFs
        this._tilesProcessed = {}; //List of tiles that have been processed (when cache enabled)
        this._tilesDrawn = []; //  List of tiles drawn  (when cache enabled)
        this._visibleTiles = {}; // tiles currently in the viewport
        this._selectedFeatures = []; // list of selected features

        this.map.addListener("zoom_changed", () => {
            self.clearAtNonVisibleZoom();
        });
    }

    getTile(coord, zoom, ownerDocument) {
        var tileContext = this.drawTile(coord, zoom, ownerDocument);
        return tileContext.canvas;
    }

    releaseTile(canvas) {
        delete this._visibleTiles[canvas.id];
        this.deleteTile(canvas.id);
    }

    deleteTile(id) {
        for (var key in this.mVTLayers) {
            this.mVTLayers[key].deleteTile(id);
        }
    }

    clearAtNonVisibleZoom() {
        for (var key in this.mVTLayers) {
            this.mVTLayers[key].clearFeaturesAtNonVisibleZoom();
        }
    }

    drawTile(coord, zoom, ownerDocument) {
        var id = this._getTileId(zoom, coord.x, coord.y);
        var tileContext = this._tilesDrawn[id];
        if (tileContext) {
            this._setTileVisible(tileContext);
            return tileContext;
        }
        var canvas = this._createCanvas(ownerDocument, id);
        var parentId = this._getParentId(id);       

        tileContext = {
            id: id,
            canvas: canvas,
            zoom: zoom,
            tileSize: this._tileSize,
            parentId: parentId
        };

        var id = tileContext.parentId || tileContext.id;
        var vectorTile = this._tilesProcessed[id];
        if (vectorTile !== undefined) {
            if (vectorTile) {
                this._drawVectorTile(vectorTile, tileContext);
            }
        }
        else {
            this._xhrRequest(tileContext);
        }
        return tileContext;
    }

    _getParentId(id) {
        var parentId = false;        
        if (this._sourceMaxZoom) {
            var tile = this._getTile(id);
            if (tile.zoom > this._sourceMaxZoom) {
                var zoomDistance = tile.zoom - this._sourceMaxZoom;
                var zoom = tile.zoom - zoomDistance;
                var x = tile.x >> zoomDistance;
                var y = tile.y >> zoomDistance;
                parentId = this._getTileId(zoom, x, y);
            }            
        }
        return parentId;
    }

    _createCanvas(ownerDocument, id) {
        const canvas = ownerDocument.createElement("canvas");
        canvas.width = this._tileSize;
        canvas.height = this._tileSize;
        canvas.id = id;
        return canvas;
    }

    _getTileId(zoom, x, y) {
        return [zoom, x, y].join(":");
    }

    _getTile(id) {
        var values = id.split(":");
        return {
            zoom: values[0],
            x: values[1],
            y: values[2]
        }
    }

    _xhrRequest = function (tileContext) {
        var self = this;

        var id = tileContext.parentId || tileContext.id;
        var tile = this._getTile(id);

        var src = this._url
            .replace("{z}", tile.zoom)
            .replace("{x}", tile.x)
            .replace("{y}", tile.y);

        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onload = function () {
            if (xmlHttpRequest.status == "200" && xmlHttpRequest.response) {
                return self._xhrResponseOk(tileContext, xmlHttpRequest.response)
            }
            self._drawDebugInfo(tileContext);
            self._tileProcessed(id, false);
        };
        xmlHttpRequest.open('GET', src, true);
        for (var header in this._xhrHeaders) {
            xmlHttpRequest.setRequestHeader(header, headers[header])
        }
        xmlHttpRequest.responseType = 'arraybuffer';
        xmlHttpRequest.send();
    }

    _xhrResponseOk = function (tileContext, response) {
        if (this.map.getZoom() != tileContext.zoom) {
            return;
        }
        var uint8Array = new Uint8Array(response);
        var pbf = new Pbf(uint8Array);
        var vectorTile = new VectorTile(pbf);
        var id = tileContext.parentId || tileContext.id;
        this._tileProcessed(id, vectorTile);
        this._drawVectorTile(vectorTile, tileContext);
    }

    _tileProcessed = function (id, vectorTile) {
        if (!this._cache) return;
        this._tilesProcessed[id] = vectorTile;
    }

    _tileDrawn = function (tileContext) {
        if (!this._cache) return;
        this._tilesDrawn[tileContext.id] = tileContext;
    }

    _drawVectorTile(vectorTile, tileContext) {
        if (this._visibleLayers) {
            for (var i = 0; i < this._visibleLayers.length; i++) {
                var key = this._visibleLayers[i];
                if (vectorTile.layers[key]) {
                    var vectorTileLayer = vectorTile.layers[key];
                    this._drawVectorTileLayer(vectorTileLayer, key, tileContext);
                }
            }
        } else {
            for (var key in vectorTile.layers) {
                var vectorTileLayer = vectorTile.layers[key];
                this._drawVectorTileLayer(vectorTileLayer, key, tileContext);
            }
        }
        tileContext.vectorTile = vectorTile;
        this._setTileVisible(tileContext);
        this._drawDebugInfo(tileContext);
        this._tileDrawn(tileContext);
    }

    _drawVectorTileLayer(vectorTileLayer, key, tileContext) {
        if (!this.mVTLayers[key]) {
            this.mVTLayers[key] = this._createMVTLayer(key);
        }
        var mVTLayer = this.mVTLayers[key];
        mVTLayer.parseVectorTileLayer(vectorTileLayer.parsedFeatures, tileContext);
    }

    _createMVTLayer(key) {
        var options = {
            getIDForLayerFeature: this.getIDForLayerFeature,
            filter: this._filter,
            style: this.style,
            name: key
        };
        return new MVTLayer(this, options);
    }

    _drawDebugInfo(tileContext) {
        if (!this._debug) return;
        var tile = this._getTile(tileContext.id)
        var width = this._tileSize;
        var height = this._tileSize;
        var context2d = tileContext.canvas.getContext('2d');
        context2d.strokeStyle = '#000000';
        context2d.fillStyle = '#FFFF00';
        context2d.strokeRect(0, 0, width, height);
        context2d.font = "12px Arial";
        context2d.fillRect(0, 0, 5, 5);
        context2d.fillRect(0, height - 5, 5, 5);
        context2d.fillRect(width - 5, 0, 5, 5);
        context2d.fillRect(width - 5, height - 5, 5, 5);
        context2d.fillRect(width / 2 - 5, height / 2 - 5, 10, 10);
        context2d.strokeText(tileContext.zoom + ' ' + tile.x + ' ' + tile.y, width / 2 - 30, height / 2 - 10);
    }

    _setTileVisible(tileContext) {
        this._visibleTiles[tileContext.id] = tileContext;
    }

    onClick(event, callbackFunction, options) {
        this._multipleSelection = (options && options.multipleSelection) || false;
        var options = {
            mouseHover: false,
            setSelected: options.setSelected || false
        }
        this._mouseEvent(event, callbackFunction, options);
    }

    onMouseHover(event, callbackFunction, options) {
        this._multipleSelection = false;
        var options = {
            mouseHover: true,
            setSelected: options.setSelected || false
        }
        this._mouseEvent(event, callbackFunction, options);
    }

    _mouseEvent(event, callbackFunction, options) {
        callbackFunction = callbackFunction || function () { };
        var zoom = this.map.getZoom();
        var tile = MERCATOR.getTileAtLatLng(event.latLng, zoom);
        event.id = this._getTileId(tile.z, tile.x, tile.y);
        event.tilePoint = MERCATOR.fromLatLngToTilePoint(this.map, event);

        var clickableLayers = this._clickableLayers || Object.keys(this.mVTLayers) || [];
        for (var i = 0; i < clickableLayers.length; i++) {
            var key = clickableLayers[i];
            var layer = this.mVTLayers[key];
            if (layer) {
                var event = layer.handleClickEvent(event);
                this._mouseSelectedFeature(event, callbackFunction, options);
            }
        }
    }

    _mouseSelectedFeature(event, callbackFunction, options) {
        if (options.setSelected) {
            if (event.feature) {
                if (options.mouseHover) {
                    if (!event.feature.selected) {
                        event.feature.select();
                    }
                }
                else {
                    event.feature.toggle();
                }
            }
            else {
                if (options.mouseHover) {
                    this.deselectAllFeatures();
                }
            }
        }
        callbackFunction(event);
    }

    deselectAllFeatures() {
        for (var i = this._selectedFeatures.length - 1; i >= 0; i--) {
            this._selectedFeatures[i].deselect();
        }
        this._selectedFeatures = [];
    }

    featureSelected(mvtFeature) {
        if (!this._multipleSelection) {
            this.deselectAllFeatures();
        }
        this._selectedFeatures.push(mvtFeature);
    }

    featureDeselected(mvtFeature) {
        const index = this._selectedFeatures.indexOf(mvtFeature);
        if (index > -1) {
            this._selectedFeatures.splice(index, 1);
        }
    }

    getSelectedFeatures() {
        return this._selectedFeatures;
    }

    setFilter(filter, redrawTiles) {
        this._filter = filter;
        for (var key in this.mVTLayers) {
            this.mVTLayers[key].setFilter(filter);
        }
        if (redrawTiles === undefined || redrawTiles) {
            this.redrawAllTiles();
        }
    }

    setStyle(style, redrawTiles) {
        this.style = style
        for (var key in this.mVTLayers) {
            this.mVTLayers[key].setStyle(style);
        }
        if (redrawTiles === undefined || redrawTiles) {
            this.redrawAllTiles();
        }
    }

    setVisibleLayers(visibleLayers, redrawTiles) {
        this._visibleLayers = visibleLayers;
        if (redrawTiles === undefined || redrawTiles) {
            this.redrawAllTiles();
        }
    }

    redrawAllTiles() {
        this._tilesDrawn = [];
        this.redrawTiles(this._visibleTiles);
    }

    redrawTiles(tiles) {
        for (var id in tiles) {
            this.redrawTile(id);
        }
    }

    redrawTile(id) {
        delete this._tilesDrawn[id];
        var tileContext = this._visibleTiles[id];
        if (!tileContext) return;
        this.clearTile(tileContext);
        this._drawVectorTile(tileContext.vectorTile, tileContext);
    }

    clearTile(tileContext) {
        var canvas = tileContext.canvas;
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}