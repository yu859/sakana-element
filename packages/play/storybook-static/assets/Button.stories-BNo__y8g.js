import{f as Tt,w as A,u,e as d,c as _}from"./index-BSv-sH05.js";import{r as gt,c as ft,a as Bt,B as K}from"./index-Qd_YNHDw.js";import{d as yt,C as wt,j as xt,b as Et,k as w,D as X,o as I,q as kt,g as H,E as q,m as St,F as L,y as Ot,p as zt,G as $t,e as Pt,z as jt,r as It,H as P}from"./vue.esm-bundler-CvFCRGgQ.js";var Ht=typeof global=="object"&&global&&global.Object===Object&&global,At=typeof self=="object"&&self&&self.Object===Object&&self,D=Ht||At||Function("return this")(),h=D.Symbol,ht=Object.prototype,Dt=ht.hasOwnProperty,Gt=ht.toString,m=h?h.toStringTag:void 0;function Mt(t){var e=Dt.call(t,m),n=t[m];try{t[m]=void 0;var r=!0}catch{}var a=Gt.call(t);return r&&(e?t[m]=n:delete t[m]),a}var Nt=Object.prototype,Rt=Nt.toString;function Ft(t){return Rt.call(t)}var Wt="[object Null]",Ut="[object Undefined]",Z=h?h.toStringTag:void 0;function bt(t){return t==null?t===void 0?Ut:Wt:Z&&Z in Object(t)?Mt(t):Ft(t)}function Vt(t){return t!=null&&typeof t=="object"}var Kt="[object Symbol]";function G(t){return typeof t=="symbol"||Vt(t)&&bt(t)==Kt}function Xt(t,e){for(var n=-1,r=t==null?0:t.length,a=Array(r);++n<r;)a[n]=e(t[n],n,t);return a}var M=Array.isArray,J=h?h.prototype:void 0,Y=J?J.toString:void 0;function vt(t){if(typeof t=="string")return t;if(M(t))return Xt(t,vt)+"";if(G(t))return Y?Y.call(t):"";var e=t+"";return e=="0"&&1/t==-1/0?"-0":e}function S(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var qt="[object AsyncFunction]",Lt="[object Function]",Zt="[object GeneratorFunction]",Jt="[object Proxy]";function Yt(t){if(!S(t))return!1;var e=bt(t);return e==Lt||e==Zt||e==qt||e==Jt}var j=D["__core-js_shared__"],Q=function(){var t=/[^.]+$/.exec(j&&j.keys&&j.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function Qt(t){return!!Q&&Q in t}var te=Function.prototype,ee=te.toString;function ne(t){if(t!=null){try{return ee.call(t)}catch{}try{return t+""}catch{}}return""}var re=/[\\^$.*+?()[\]{}|]/g,ae=/^\[object .+?Constructor\]$/,oe=Function.prototype,se=Object.prototype,ie=oe.toString,ce=se.hasOwnProperty,le=RegExp("^"+ie.call(ce).replace(re,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function ue(t){if(!S(t)||Qt(t))return!1;var e=Yt(t)?le:ae;return e.test(ne(t))}function pe(t,e){return t==null?void 0:t[e]}function N(t,e){var n=pe(t,e);return ue(n)?n:void 0}var tt=function(){try{var t=N(Object,"defineProperty");return t({},"",{}),t}catch{}}(),de=9007199254740991,ge=/^(?:0|[1-9]\d*)$/;function fe(t,e){var n=typeof t;return e=e??de,!!e&&(n=="number"||n!="symbol"&&ge.test(t))&&t>-1&&t%1==0&&t<e}function ye(t,e,n){e=="__proto__"&&tt?tt(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}function mt(t,e){return t===e||t!==t&&e!==e}var he=Object.prototype,be=he.hasOwnProperty;function ve(t,e,n){var r=t[e];(!(be.call(t,e)&&mt(r,n))||n===void 0&&!(e in t))&&ye(t,e,n)}var me=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,_e=/^\w*$/;function Ce(t,e){if(M(t))return!1;var n=typeof t;return n=="number"||n=="symbol"||n=="boolean"||t==null||G(t)?!0:_e.test(t)||!me.test(t)||e!=null&&t in Object(e)}var T=N(Object,"create");function Te(){this.__data__=T?T(null):{},this.size=0}function Be(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var we="__lodash_hash_undefined__",xe=Object.prototype,Ee=xe.hasOwnProperty;function ke(t){var e=this.__data__;if(T){var n=e[t];return n===we?void 0:n}return Ee.call(e,t)?e[t]:void 0}var Se=Object.prototype,Oe=Se.hasOwnProperty;function ze(t){var e=this.__data__;return T?e[t]!==void 0:Oe.call(e,t)}var $e="__lodash_hash_undefined__";function Pe(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=T&&e===void 0?$e:e,this}function g(t){var e=-1,n=t==null?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}g.prototype.clear=Te;g.prototype.delete=Be;g.prototype.get=ke;g.prototype.has=ze;g.prototype.set=Pe;function je(){this.__data__=[],this.size=0}function O(t,e){for(var n=t.length;n--;)if(mt(t[n][0],e))return n;return-1}var Ie=Array.prototype,He=Ie.splice;function Ae(t){var e=this.__data__,n=O(e,t);if(n<0)return!1;var r=e.length-1;return n==r?e.pop():He.call(e,n,1),--this.size,!0}function De(t){var e=this.__data__,n=O(e,t);return n<0?void 0:e[n][1]}function Ge(t){return O(this.__data__,t)>-1}function Me(t,e){var n=this.__data__,r=O(n,t);return r<0?(++this.size,n.push([t,e])):n[r][1]=e,this}function b(t){var e=-1,n=t==null?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}b.prototype.clear=je;b.prototype.delete=Ae;b.prototype.get=De;b.prototype.has=Ge;b.prototype.set=Me;var Ne=N(D,"Map");function Re(){this.size=0,this.__data__={hash:new g,map:new(Ne||b),string:new g}}function Fe(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}function z(t,e){var n=t.__data__;return Fe(e)?n[typeof e=="string"?"string":"hash"]:n.map}function We(t){var e=z(this,t).delete(t);return this.size-=e?1:0,e}function Ue(t){return z(this,t).get(t)}function Ve(t){return z(this,t).has(t)}function Ke(t,e){var n=z(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this}function f(t){var e=-1,n=t==null?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}f.prototype.clear=Re;f.prototype.delete=We;f.prototype.get=Ue;f.prototype.has=Ve;f.prototype.set=Ke;var Xe="Expected a function";function R(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(Xe);var n=function(){var r=arguments,a=e?e.apply(this,r):r[0],s=n.cache;if(s.has(a))return s.get(a);var i=t.apply(this,r);return n.cache=s.set(a,i)||s,i};return n.cache=new(R.Cache||f),n}R.Cache=f;var qe=500;function Le(t){var e=R(t,function(r){return n.size===qe&&n.clear(),r}),n=e.cache;return e}var Ze=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Je=/\\(\\)?/g,Ye=Le(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(Ze,function(n,r,a,s){e.push(a?s.replace(Je,"$1"):r||n)}),e});function Qe(t){return t==null?"":vt(t)}function tn(t,e){return M(t)?t:Ce(t,e)?[t]:Ye(Qe(t))}function en(t){if(typeof t=="string"||G(t))return t;var e=t+"";return e=="0"&&1/t==-1/0?"-0":e}function nn(t,e,n,r){if(!S(t))return t;e=tn(e,t);for(var a=-1,s=e.length,i=s-1,l=t;l!=null&&++a<s;){var c=en(e[a]),p=n;if(c==="__proto__"||c==="constructor"||c==="prototype")return t;if(a!=i){var v=l[c];p=void 0,p===void 0&&(p=S(v)?v:fe(e[a+1])?[]:{})}ve(l,c,p),l=l[c]}return t}function y(t,e,n){return t==null?t:nn(t,e,n)}const _t=Symbol("BUTTON_GROUP_CTX_KEY"),rn=ft(yt({name:"ErButton",__name:"Button",props:{tag:{default:"button"},type:{},size:{},nativeType:{default:"button"},disabled:{type:Boolean},loading:{type:Boolean},icon:{},circle:{type:Boolean},plain:{type:Boolean},round:{type:Boolean},loadingIcon:{},autofocus:{type:Boolean},useThrottle:{type:Boolean,default:!0},throttleDuration:{default:500}},emits:["click"],setup(t,{expose:e,emit:n}){const r=t,a=n,s=wt(),i=xt(_t,void 0),l=Et(),c=w(()=>(i==null?void 0:i.size)??(r==null?void 0:r.size)??""),p=w(()=>(i==null?void 0:i.type)??(r==null?void 0:r.type)??""),v=w(()=>(i==null?void 0:i.disabled)||(r==null?void 0:r.disabled)||!1),F=w(()=>({marginRight:s.default?"6px":"0px"})),W=o=>a("click",o),Ct=Bt(W,r.throttleDuration,{trailing:!1});return e({ref:l}),(o,U)=>(I(),X($t(o.tag),{ref_key:"_ref",ref:l,autofocus:o.autofocus,type:o.tag==="button"?o.nativeType:void 0,class:zt(["er-button",{[`er-button--${p.value}`]:p.value,[`er-button--${c.value}`]:c.value,"is-plain":o.plain,"is-round":o.round,"is-circle":o.circle,"is-disabled":v.value,"is-loading":o.loading}]),disabled:!(!v.value&&!o.loading)||void 0,onClick:U[0]||(U[0]=V=>o.useThrottle?Ot(Ct)(V):W(V))},{default:kt(()=>[o.loading?H(o.$slots,"loading",{key:0},()=>[St(K,{class:"loading-icon",icon:o.loadingIcon??"spinner",style:L(F.value),size:"1x",spin:""},null,8,["icon","style"])],!0):q("",!0),o.icon&&!o.loading?(I(),X(K,{key:1,icon:o.icon,style:L(F.value),size:"1x"},null,8,["icon","style"])):q("",!0),H(o.$slots,"default",{},void 0,!0)]),_:3},8,["autofocus","type","disabled","class"]))}}),[["__scopeId","data-v-3a64ee7d"]]),an={class:"er-button-group"},on=ft(yt({name:"ErButtonGroup",__name:"ButtonGroup",props:{size:{},type:{},disabled:{type:Boolean}},setup(t){const e=t;return jt(_t,It({size:P(e,"size"),type:P(e,"type"),disabled:P(e,"disabled")})),(n,r)=>(I(),Pt("div",an,[H(n.$slots,"default",{},void 0,!0)]))}}),[["__scopeId","data-v-f316cd1a"]]),B=gt(rn),sn=gt(on),pn={title:"Example/Button",component:B,tags:["autodocs"],argTypes:{type:{control:{type:"select"},options:["primary","success","warning","danger","info",""]},size:{control:{type:"select"},options:["large","default","small",""]},disabled:{control:"boolean"},loading:{control:"boolean"},useThrottle:{control:"boolean"},throttleDuration:{control:"number"},autofocus:{control:"boolean"},tag:{control:{type:"select"},options:["button","a","div"]},nativeType:{control:{type:"select"},options:["button","submit","reset",""]},icon:{control:{type:"text"}},loadingIcon:{control:{type:"text"}}},args:{onClick:Tt()}},$=t=>`
<div style="margin:5px">
  ${t}
</div>
`,x={argTypes:{content:{control:{type:"text"}}},args:{type:"primary",content:"Button"},render:t=>({components:{ErButton:B},setup(){return{args:t}},template:$('<er-button data-testid="story-test-btn" v-bind="args">{{args.content}}</er-button>')}),play:async({canvasElement:t,args:e,step:n})=>{const a=A(t).getByTestId("story-test-btn");await n("When useThrottle is set to true, the onClick should be called once",async()=>{y(e,"useThrottle",!0),await u.tripleClick(a),d(e.onClick).toHaveBeenCalledOnce(),_()}),await n("When useThrottle is set to false, the onClick should be called three times",async()=>{y(e,"useThrottle",!1),await u.tripleClick(a),d(e.onClick).toHaveBeenCalledTimes(3),_()}),await n("When disabled is set to true, the onClick should not be called",async()=>{y(e,"disabled",!0),await u.click(a),d(e.onClick).toHaveBeenCalledTimes(0),y(e,"disabled",!1),_()}),await n("When loading is set to true, the onClick should not be called",async()=>{y(e,"loading",!0),await u.click(a),d(e.onClick).toHaveBeenCalledTimes(0),y(e,"loading",!1),_()})}},E={argTypes:{content:{control:{type:"text"}}},args:{content:"Button",autofocus:!0},render:t=>({components:{ErButton:B},setup(){return{args:t}},template:$(`
      <p>请点击浏览器的刷新页面来获取按钮聚焦</p>
      <er-button data-testid="story-test-btn" v-bind="args">{{args.content}}</er-button>
    `)}),play:async({args:t})=>{await u.keyboard("{enter}"),d(t.onClick).toHaveBeenCalledOnce(),_()}},C={args:{icon:"search"},render:t=>({components:{ErButton:B},setup(){return{args:t}},template:$(`
      <er-button circle v-bind="args"/>
    `)}),play:async({canvasElement:t,args:e,step:n})=>{const r=A(t);await n("click button",async()=>{await u.click(r.getByRole("button"))}),d(e.onClick).toHaveBeenCalled()}};C.parameters={};const k={argTypes:{groupType:{control:{type:"select"},options:["primary","success","warning","danger","info",""]},groupSize:{control:{type:"select"},options:["large","default","small",""]},groupDisabled:{control:"boolean"},content1:{control:{type:"text"},defaultValue:"Button1"},content2:{control:{type:"text"},defaultValue:"Button2"}},args:{round:!0,content1:"Button1",content2:"Button2"},render:t=>({components:{ErButton:B,ErButtonGroup:sn},setup(){return{args:t}},template:$(`
      <er-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
        <er-button v-bind="args">{{args.content1}}</er-button>
        <er-button v-bind="args">{{args.content2}}</er-button>
      </er-button-group>
    `)}),play:async({canvasElement:t,args:e,step:n})=>{const r=A(t);await n("click btn1",async()=>{await u.click(r.getByText("Button1"))}),await n("click btn2",async()=>{await u.click(r.getByText("Button2"))}),d(e.onClick).toHaveBeenCalled()}};var et,nt,rt;x.parameters={...x.parameters,docs:{...(et=x.parameters)==null?void 0:et.docs,source:{originalSource:`{
  argTypes: {
    content: {
      control: {
        type: 'text'
      }
    }
  },
  args: {
    type: 'primary',
    content: 'Button'
  },
  render: args => ({
    components: {
      ErButton
    },
    setup() {
      return {
        args
      };
    },
    template: container(\`<er-button data-testid="story-test-btn" v-bind="args">{{args.content}}</er-button>\`)
  }),
  // 异步测试函数
  play: async ({
    canvasElement,
    args,
    step
  }) => {
    // 获取测试环境中的 canvas 和按钮元素
    const canvas = within(canvasElement);
    const btn = canvas.getByTestId('story-test-btn');

    // 测试场景1：节流模式开启时的点击行为
    await step('When useThrottle is set to true, the onClick should be called once', async () => {
      set(args, 'useThrottle', true);
      await userEvent.tripleClick(btn);
      expect(args.onClick).toHaveBeenCalledOnce();
      clearAllMocks();
    });

    // 测试场景2：节流模式关闭时的点击行为
    await step('When useThrottle is set to false, the onClick should be called three times', async () => {
      set(args, 'useThrottle', false);
      await userEvent.tripleClick(btn);
      expect(args.onClick).toHaveBeenCalledTimes(3);
      clearAllMocks();
    });

    // 测试场景3：按钮禁用时的点击行为
    await step('When disabled is set to true, the onClick should not be called', async () => {
      set(args, 'disabled', true);
      await userEvent.click(btn);
      expect(args.onClick).toHaveBeenCalledTimes(0);
      set(args, 'disabled', false);
      clearAllMocks();
    });

    // 测试用例：测试加载状态下按钮的点击行为
    await step('When loading is set to true, the onClick should not be called', async () => {
      set(args, 'loading', true);
      await userEvent.click(btn);
      expect(args.onClick).toHaveBeenCalledTimes(0);
      set(args, 'loading', false);
      clearAllMocks();
    });
  }
}`,...(rt=(nt=x.parameters)==null?void 0:nt.docs)==null?void 0:rt.source}}};var at,ot,st;E.parameters={...E.parameters,docs:{...(at=E.parameters)==null?void 0:at.docs,source:{originalSource:`{
  argTypes: {
    content: {
      control: {
        type: 'text'
      }
    }
  },
  args: {
    content: 'Button',
    autofocus: true
  },
  render: args => ({
    components: {
      ErButton
    },
    setup() {
      return {
        args
      };
    },
    template: container(\`
      <p>请点击浏览器的刷新页面来获取按钮聚焦</p>
      <er-button data-testid="story-test-btn" v-bind="args">{{args.content}}</er-button>
    \`)
  }),
  play: async ({
    args
  }) => {
    await userEvent.keyboard('{enter}');
    expect(args.onClick).toHaveBeenCalledOnce();
    clearAllMocks();
  }
}`,...(st=(ot=E.parameters)==null?void 0:ot.docs)==null?void 0:st.source}}};var it,ct,lt;C.parameters={...C.parameters,docs:{...(it=C.parameters)==null?void 0:it.docs,source:{originalSource:`{
  args: {
    icon: 'search'
  },
  render: args => ({
    components: {
      ErButton
    },
    setup() {
      return {
        args
      };
    },
    template: container(\`
      <er-button circle v-bind="args"/>
    \`)
  }),
  play: async ({
    canvasElement,
    args,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('click button', async () => {
      await userEvent.click(canvas.getByRole('button'));
    });
    expect(args.onClick).toHaveBeenCalled();
  }
}`,...(lt=(ct=C.parameters)==null?void 0:ct.docs)==null?void 0:lt.source}}};var ut,pt,dt;k.parameters={...k.parameters,docs:{...(ut=k.parameters)==null?void 0:ut.docs,source:{originalSource:`{
  argTypes: {
    groupType: {
      control: {
        type: 'select'
      },
      options: ['primary', 'success', 'warning', 'danger', 'info', '']
    },
    groupSize: {
      control: {
        type: 'select'
      },
      options: ['large', 'default', 'small', '']
    },
    groupDisabled: {
      control: 'boolean'
    },
    content1: {
      control: {
        type: 'text'
      },
      defaultValue: 'Button1'
    },
    content2: {
      control: {
        type: 'text'
      },
      defaultValue: 'Button2'
    }
  },
  args: {
    round: true,
    content1: 'Button1',
    content2: 'Button2'
  },
  render: args => ({
    components: {
      ErButton,
      ErButtonGroup
    },
    setup() {
      return {
        args
      };
    },
    template: container(\`
      <er-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
        <er-button v-bind="args">{{args.content1}}</er-button>
        <er-button v-bind="args">{{args.content2}}</er-button>
      </er-button-group>
    \`)
  }),
  play: async ({
    canvasElement,
    args,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('click btn1', async () => {
      await userEvent.click(canvas.getByText('Button1'));
    });
    await step('click btn2', async () => {
      await userEvent.click(canvas.getByText('Button2'));
    });
    expect(args.onClick).toHaveBeenCalled();
  }
}`,...(dt=(pt=k.parameters)==null?void 0:pt.docs)==null?void 0:dt.source}}};const dn=["Default","Autofocus","Circle","Group"];export{E as Autofocus,C as Circle,x as Default,k as Group,dn as __namedExportsOrder,pn as default};
