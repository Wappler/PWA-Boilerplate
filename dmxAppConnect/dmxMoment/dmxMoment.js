/*!
 DMXzone Moment
 Version: 1.0.0
 (c) 2018 DMXzone.com
 @build 2018-09-18 16:36:14
 */
dmx.Component("moment",{initialData:{locale:"en"},attributes:{locale:{type:String,default:"en"}},methods:{setLocale:function(e){this.setLocale(e)}},render:function(e){moment||alert("Moment is missing!"),this.update({})},update:function(e){e.locale!=this.props.locale&&this.setLocale(this.props.locale)},setLocale:function(e){moment.locale("auto"==e?window.navigator.language:e),this.set("locale",moment.locale())}});
//# sourceMappingURL=../maps/dmxMoment.js.map
