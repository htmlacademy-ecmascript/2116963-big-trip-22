(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,i="millisecond",n="second",s="minute",r="hour",a="day",l="week",o="month",u="quarter",c="year",d="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}},h=function(e,t,i){var n=String(e);return!n||n.length>=t?e:""+Array(t+1-n.length).join(i)+e},_={s:h,z:function(e){var t=-e.utcOffset(),i=Math.abs(t),n=Math.floor(i/60),s=i%60;return(t<=0?"+":"-")+h(n,2,"0")+":"+h(s,2,"0")},m:function e(t,i){if(t.date()<i.date())return-e(i,t);var n=12*(i.year()-t.year())+(i.month()-t.month()),s=t.clone().add(n,o),r=i-s<0,a=t.clone().add(n+(r?-1:1),o);return+(-(n+(i-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:o,y:c,w:l,d:a,D:d,h:r,m:s,s:n,ms:i,Q:u}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},g="en",$={};$[g]=m;var y=function(e){return e instanceof w},b=function e(t,i,n){var s;if(!t)return g;if("string"==typeof t){var r=t.toLowerCase();$[r]&&(s=r),i&&($[r]=i,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var l=t.name;$[l]=t,s=l}return!n&&s&&(g=s),s||!n&&g},M=function(e,t){if(y(e))return e.clone();var i="object"==typeof t?t:{};return i.date=e,i.args=arguments,new w(i)},D=_;D.l=b,D.i=y,D.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function m(e){this.$L=b(e.locale,null,!0),this.parse(e)}var h=m.prototype;return h.parse=function(e){this.$d=function(e){var t=e.date,i=e.utc;if(null===t)return new Date(NaN);if(D.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var n=t.match(f);if(n){var s=n[2]-1||0,r=(n[7]||"0").substring(0,3);return i?new Date(Date.UTC(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)):new Date(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},h.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},h.$utils=function(){return D},h.isValid=function(){return!(this.$d.toString()===p)},h.isSame=function(e,t){var i=M(e);return this.startOf(t)<=i&&i<=this.endOf(t)},h.isAfter=function(e,t){return M(e)<this.startOf(t)},h.isBefore=function(e,t){return this.endOf(t)<M(e)},h.$g=function(e,t,i){return D.u(e)?this[t]:this.set(i,e)},h.unix=function(){return Math.floor(this.valueOf()/1e3)},h.valueOf=function(){return this.$d.getTime()},h.startOf=function(e,t){var i=this,u=!!D.u(t)||t,p=D.p(e),f=function(e,t){var n=D.w(i.$u?Date.UTC(i.$y,t,e):new Date(i.$y,t,e),i);return u?n:n.endOf(a)},v=function(e,t){return D.w(i.toDate()[e].apply(i.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(t)),i)},m=this.$W,h=this.$M,_=this.$D,g="set"+(this.$u?"UTC":"");switch(p){case c:return u?f(1,0):f(31,11);case o:return u?f(1,h):f(0,h+1);case l:var $=this.$locale().weekStart||0,y=(m<$?m+7:m)-$;return f(u?_-y:_+(6-y),h);case a:case d:return v(g+"Hours",0);case r:return v(g+"Minutes",1);case s:return v(g+"Seconds",2);case n:return v(g+"Milliseconds",3);default:return this.clone()}},h.endOf=function(e){return this.startOf(e,!1)},h.$set=function(e,t){var l,u=D.p(e),p="set"+(this.$u?"UTC":""),f=(l={},l[a]=p+"Date",l[d]=p+"Date",l[o]=p+"Month",l[c]=p+"FullYear",l[r]=p+"Hours",l[s]=p+"Minutes",l[n]=p+"Seconds",l[i]=p+"Milliseconds",l)[u],v=u===a?this.$D+(t-this.$W):t;if(u===o||u===c){var m=this.clone().set(d,1);m.$d[f](v),m.init(),this.$d=m.set(d,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](v);return this.init(),this},h.set=function(e,t){return this.clone().$set(e,t)},h.get=function(e){return this[D.p(e)]()},h.add=function(i,u){var d,p=this;i=Number(i);var f=D.p(u),v=function(e){var t=M(p);return D.w(t.date(t.date()+Math.round(e*i)),p)};if(f===o)return this.set(o,this.$M+i);if(f===c)return this.set(c,this.$y+i);if(f===a)return v(1);if(f===l)return v(7);var m=(d={},d[s]=e,d[r]=t,d[n]=1e3,d)[f]||1,h=this.$d.getTime()+i*m;return D.w(h,this)},h.subtract=function(e,t){return this.add(-1*e,t)},h.format=function(e){var t=this,i=this.$locale();if(!this.isValid())return i.invalidDate||p;var n=e||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,a=this.$m,l=this.$M,o=i.weekdays,u=i.months,c=function(e,i,s,r){return e&&(e[i]||e(t,n))||s[i].slice(0,r)},d=function(e){return D.s(r%12||12,e,"0")},f=i.meridiem||function(e,t,i){var n=e<12?"AM":"PM";return i?n.toLowerCase():n},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:D.s(l+1,2,"0"),MMM:c(i.monthsShort,l,u,3),MMMM:c(u,l),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,o,2),ddd:c(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(r),HH:D.s(r,2,"0"),h:d(1),hh:d(2),a:f(r,a,!0),A:f(r,a,!1),m:String(a),mm:D.s(a,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return n.replace(v,(function(e,t){return t||m[e]||s.replace(":","")}))},h.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},h.diff=function(i,d,p){var f,v=D.p(d),m=M(i),h=(m.utcOffset()-this.utcOffset())*e,_=this-m,g=D.m(this,m);return g=(f={},f[c]=g/12,f[o]=g,f[u]=g/3,f[l]=(_-h)/6048e5,f[a]=(_-h)/864e5,f[r]=_/t,f[s]=_/e,f[n]=_/1e3,f)[v]||_,p?g:D.a(g)},h.daysInMonth=function(){return this.endOf(o).$D},h.$locale=function(){return $[this.$L]},h.locale=function(e,t){if(!e)return this.$L;var i=this.clone(),n=b(e,t,!0);return n&&(i.$L=n),i},h.clone=function(){return D.w(this.$d,this)},h.toDate=function(){return new Date(this.valueOf())},h.toJSON=function(){return this.isValid()?this.toISOString():null},h.toISOString=function(){return this.$d.toISOString()},h.toString=function(){return this.$d.toUTCString()},m}(),T=w.prototype;return M.prototype=T,[["$ms",i],["$s",n],["$m",s],["$H",r],["$W",a],["$M",o],["$y",c],["$D",d]].forEach((function(e){T[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,w,M),e.$i=!0),M},M.locale=b,M.isDayjs=y,M.unix=function(e){return M(1e3*e)},M.en=$[g],M.Ls=$,M.p={},M}()}},t={};function i(n){var s=t[n];if(void 0!==s)return s.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,i),r.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,i="beforeend"){t.insertAdjacentElement(i,e.getElement())}class n{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n      <div class="trip-filters__filter">\n        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n        <label class="trip-filters__filter-label" for="filter-future">Future</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n        <label class="trip-filters__filter-label" for="filter-present">Present</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n        <label class="trip-filters__filter-label" for="filter-past">Past</label>\n      </div>\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class s{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      <div class="trip-sort__item  trip-sort__item--day">\n        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n        <label class="trip-sort__btn" for="sort-day">Day</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--event">\n        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n        <label class="trip-sort__btn" for="sort-event">Event</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--time">\n        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n        <label class="trip-sort__btn" for="sort-time">Time</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--price">\n        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n        <label class="trip-sort__btn" for="sort-price">Price</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--offer">\n        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n        <label class="trip-sort__btn" for="sort-offer">Offers</label>\n      </div>\n    </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var a=i(484),l=i.n(a);const o="minute",u=1440,c=60;function d(e,t){if(e)return l()(e).format(t)}const p=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],f="D",v="H",m="M",h="HH:mm",_="DD/MM/YY HH:mm";function g(e,t){return`${(e<10?`0${e}`:e.toString())+t} `}class ${constructor({point:e,offers:t,destinations:i}){this.point=e,this.offers=t,this.destinations=i}getTemplate(){return function(e,t,i){const{basePrice:n,dateFrom:s,dateTo:r,destination:a,isFavorite:p,offers:_,type:$}=e,y=[...t.find((e=>e.type===$)).offers],b=i.find((e=>a===e.id)),M=p?"event__favorite-btn--active":"";return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${s}">${d(s,"MMM DD")}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${$}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${$} ${b.name}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${s}">${d(s,h)}</time>\n            &mdash;\n            <time class="event__end-time" datetime="${r}">${d(r,h)}</time>\n          </p>\n          <p class="event__duration">${function(e,t){const{days:i,hours:n,minutes:s}=function(e,t){const i=l()(t).diff(l()(e),o);return{days:Math.floor(i/u),hours:Math.floor(i%u/c),minutes:Math.floor(i%c)}}(e,t),r=g(i,f),a=g(n,v),d=g(s,m);return i>0?r+a+d:n>0?a+d:d}(s,r)}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${n}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${_.length?function(e,t){return e.filter((e=>t.includes(e.id))).map((e=>`<li class="event__offer">\n        <span class="event__offer-title">${e.title}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${e.price}</span>\n      </li>`)).join("")}(y,_):""}\n        </ul>\n        <button class="event__favorite-btn  ${M}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`}(this.point,this.offers,this.destinations)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class y{constructor({point:e,offers:t,destinations:i}){this.point=e,this.offers=t,this.destinations=i}getTemplate(){return function(e,t,i){const{id:n=0,basePrice:s="",dateFrom:r=new Date,dateTo:a=new Date,destination:l="",offers:o=[],type:u=p[0]}=e,c=[...t.find((e=>e.type===u)).offers],f=i.find((e=>l===e.id));return`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-${n}">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${u}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${n}" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n                ${function(e,t){return p.map((i=>`<div class="event__type-item">\n         <input id="event-type-${i}-${t}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${i}" ${i===e?"checked":""}>\n         <label class="event__type-label  event__type-label--${i}" for="event-type-${i}-${t}">${i}</label>\n       </div>`)).join("")}(u,n)}\n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-${n}">\n              ${u}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-${n}" type="text" name="event-destination" value="${f?f.name:""}" list="destination-list-${n}">\n            <datalist id="destination-list-${n}">\n              ${i.map((e=>`<option value="${e.name}"></option>`)).join("")}\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-${n}">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-${n}" type="text" name="event-start-time" value="${d(r,_)}">\n            &mdash;\n            <label class="visually-hidden" for="event-end-time-${n}">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-${n}" type="text" name="event-end-time" value="${d(a,_)}">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-${n}">\n              <span class="visually-hidden">Price</span>\n              &euro;\n            </label>\n            <input class="event__input  event__input--price" id="event-price-${n}" type="text" name="event-price" value="${s}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">${0===n?"Cancel":"Delete"}</button>\n          ${0!==n?'<button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>':""}\n        </header>\n        <section class="event__details">\n          ${c.length?function(e,t,i){return`<section class="event__section  event__section--offers">\n      <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n      <div class="event__available-offers">\n        ${function(e,t,i){return t.map((t=>{const n=i.includes(t.id)?"checked":"";return`<div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${e}" type="checkbox" name="event-offer-luggage" ${n}>\n        <label class="event__offer-label" for="event-offer-luggage-${e}">\n          <span class="event__offer-title">${t.title}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${t.price}</span>\n        </label>\n      </div>`})).join("")}(e,t,i)}\n      </div>\n    </section>`}(n,c,o):""}\n          ${f?function(e){return`<section class="event__section  event__section--destination">\n      <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n      <p class="event__destination-description">${e.description}</p>\n      <div class="event__photos-container">\n        <div class="event__photos-tape">\n          ${e.pictures.map((e=>`<img class="event__photo" src="${e.src}" alt="${e.description}">`))}\n        </div>\n      </div>\n    </section>`}(f):""}\n        </section>\n      </form>\n    </li>`}(this.point,this.offers,this.destinations)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const b=new class{constructor(){this.points=[],this.offers=[],this.destinations=[]}init(e,t,i){this.points=e,this.offers=t,this.destinations=i}getPoints(){return this.points}getOffers(){return this.offers}getDestinations(){return this.destinations}};b.init([{id:1,basePrice:100,dateFrom:"2019-03-19T00:00",dateTo:"2019-03-20T01:00",destination:1,isFavorite:!1,offers:[1,2,3],type:"flight"},{id:2,basePrice:200,dateFrom:"2019-03-20T10:30",dateTo:"2019-03-20T11:00",destination:2,isFavorite:!0,offers:[1],type:"taxi"},{id:3,basePrice:300,dateFrom:"2019-03-20T16:25",dateTo:"2019-03-22T10:35",destination:2,isFavorite:!1,offers:[1,2],type:"sightseeing"},{id:4,basePrice:400,dateFrom:"2019-03-22T12:00",dateTo:"2019-03-22T22:00",destination:3,isFavorite:!0,offers:[1],type:"drive"}],[{type:"flight",offers:[{id:1,title:"Add luggage",price:30},{id:2,title:"Switch to comfort class",price:100},{id:3,title:"Add meal",price:15},{id:4,title:"Choose seats",price:5},{id:5,title:"Travel by train",price:40}]},{type:"taxi",offers:[{id:1,title:"Order Uber",price:20},{id:2,title:"Upgrade to a business class",price:120}]},{type:"drive",offers:[{id:1,title:"Rent a car",price:200},{id:2,title:"Upgrade",price:100}]},{type:"sightseeing",offers:[{id:1,title:"Book tickets",price:40},{id:2,title:"Lunch in city",price:30}]}],[{id:1,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac purus urna. Aliquam eget pellentesque tortor. Etiam vel nulla vel neque sagittis luctus. Fusce bibendum, arcu vel interdum efficitur, quam orci ullamcorper eros, id viverra lacus mi et purus. Nunc euismod non ligula at volutpat. Cras vitae odio in est rutrum elementum vitae bibendum est. Nunc vitae convallis sapien. Nunc commodo varius dolor nec mollis.",name:"Chamonix",pictures:[{src:"https://loremflickr.com/248/152?random=1",description:"Lorem ipsum"},{src:"https://loremflickr.com/248/152?random=2",description:"Lorem ipsum"}]},{id:2,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed mauris quam. Ut ante tortor, porta eget euismod ut, maximus a lorem. Quisque suscipit ornare quam quis accumsan. Nunc nec lectus vitae mauris commodo vulputate. Phasellus efficitur malesuada lectus, sed pulvinar neque sagittis sit amet. Phasellus faucibus risus at elit ultricies auctor vel non dui. Morbi quam tellus, auctor quis imperdiet non, gravida in dui. Nunc mollis nulla vel arcu aliquam molestie. Mauris et vestibulum risus, eget aliquet nulla.",name:"Geneva",pictures:[{src:"https://loremflickr.com/248/152?random=1",description:"Lorem ipsum"}]},{id:3,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique risus et malesuada eleifend. Vivamus quam felis, aliquet placerat nunc vitae, feugiat fermentum enim. Donec ultrices, neque commodo molestie feugiat, orci felis faucibus erat, vel finibus orci libero vitae velit. Nullam quis convallis velit, nec convallis ligula. Vivamus dui turpis, pulvinar nec elementum quis, eleifend et ligula. Duis condimentum justo in porttitor pulvinar. Quisque quis ex tortor. Proin sed facilisis turpis. Aenean ultricies ligula eget felis eleifend tempus. Quisque finibus arcu vel tellus placerat, eu convallis est commodo. Nulla molestie interdum viverra.",name:"Amsterdam",pictures:[]},{id:4,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique risus et malesuada eleifend. Vivamus quam felis, aliquet placerat nunc vitae, feugiat fermentum enim. Donec ultrices, neque commodo molestie feugiat, orci felis faucibus erat, vel finibus orci libero vitae velit. Nullam quis convallis velit, nec convallis ligula. Vivamus dui turpis, pulvinar nec elementum quis, eleifend et ligula. Duis condimentum justo in porttitor pulvinar. Quisque quis ex tortor. Proin sed facilisis turpis. Aenean ultricies ligula eget felis eleifend tempus. Quisque finibus arcu vel tellus placerat, eu convallis est commodo. Nulla molestie interdum viverra.",name:"Moscow",pictures:[{src:"https://loremflickr.com/248/152?random=1",description:"Lorem ipsum"}]}]);const M=new class{headerMainContainer=document.querySelector(".trip-main");filterContainer=document.querySelector(".trip-controls__filters");tripEventsContainer=document.querySelector(".trip-events");ListComponent=new r;constructor({model:e}){this.model=e}init(){this.points=[...this.model.getPoints()],this.offers=[...this.model.getOffers()],this.destinations=[...this.model.getDestinations()],t(new n,this.filterContainer),t(new s,this.tripEventsContainer),t(this.ListComponent,this.tripEventsContainer),t(new y({point:{},offers:this.offers,destinations:this.destinations}),this.ListComponent.getElement()),t(new y({point:this.points[0],offers:this.offers,destinations:this.destinations}),this.ListComponent.getElement()),this.points.forEach((e=>{t(new $({point:e,offers:this.offers,destinations:this.destinations}),this.ListComponent.getElement())}))}}({model:b});M.init()})()})();
//# sourceMappingURL=bundle.11e163ce193dfb542849.js.map