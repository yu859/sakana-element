import{r as x,c as y,B as N,t as S}from"./index-Qd_YNHDw.js";import{d as V,b as D,e as w,f as T,w as j,o as I,g as d,j as z,k as H,l as r,m as p,n as L,t as O,p as u,q,s as A,v as F,u as G,x as J,y as P,T as K,z as M}from"./vue.esm-bundler-CvFCRGgQ.js";const B=Symbol("collapseContext"),Q={class:"er-collapse"},R="ErCollapse",U=y(V({name:R,__name:"Collapse",props:{modelValue:{},accordion:{type:Boolean}},emits:["update:modelValue","change"],setup(e,{emit:n}){const l=e,i=n,o=D(l.modelValue);function a(t){o.value=t,i("update:modelValue",t),i("change",t)}return l.accordion&&o.value.length>1&&console.warn("accordion mode should only have one active item"),T(()=>{l.accordion&&o.value.length>1&&S()}),j(()=>l.modelValue,t=>a(t)),M(B,{activeNames:o,handleItemClick:function(t){let s=[...o.value];if(l.accordion)return s=[s[0]===t?"":t],void a(s);const m=s.indexOf(t);m>-1?s.splice(m,1):s.push(t),a(s)}}),(t,s)=>(I(),w("div",Q,[d(t.$slots,"default",{},void 0,!0)]))}}),[["__scopeId","data-v-51f3c344"]]),v=e=>e.style.height="0px",h=e=>e.style.height=`${e.scrollHeight}px`,f=e=>e.style.height="",b=e=>e.style.overflow="hidden",g=e=>e.style.overflow="",W={beforeEnter(e){v(e),b(e)},enter:e=>h(e),afterEnter(e){f(e),g(e)},beforeLeave(e){h(e),b(e)},leave:e=>v(e),afterLeave(e){f(e),g(e)}},X=["id"],Y={class:"er-collapse-item__title"},Z={class:"er-collapse-item__wapper"},ee=["id"],ae=y(V({name:"ErCollapseItem",__name:"CollapseItem",props:{name:{},title:{},disabled:{type:Boolean}},setup(e){const n=e,l=z(B,void 0),i=H(()=>{var a;return(a=l==null?void 0:l.activeNames.value)==null?void 0:a.includes(n.name)});function o(){n.disabled||(l==null||l.handleItemClick(n.name))}return(a,t)=>(I(),w("div",{class:u(["er-collapse-item",{"is-disabled":a.disabled}])},[r("div",{class:u(["er-collapse-item__header",{"is-disabled":a.disabled,"is-active":i.value}]),id:`item-header-${a.name}`,onClick:o},[r("span",Y,[d(a.$slots,"title",{},()=>[L(O(a.title),1)],!0)]),p(N,{icon:"angle-right",class:"header-angle"})],10,X),p(K,G({name:"slide"},J(P(W))),{default:q(()=>[A(r("div",Z,[r("div",{class:"er-collapse-item__content",id:`item-content-${a.name}`},[d(a.$slots,"default",{},void 0,!0)],8,ee)],512),[[F,i.value]])]),_:3},16)],2))}}),[["__scopeId","data-v-0542cc04"]]),k=x(U),$=x(ae),se={title:"Example/Collapse",component:k,subcomponents:{ErCollapseItem:$},tags:["autodocs"]},c={render:e=>({components:{ErCollapse:k,ErCollapseItem:$},setup(){return{args:e}},template:`
    <er-collapse v-bind="args">
      <er-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </er-collapse-item>
      <er-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </er-collapse-item>
      <er-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </er-collapse-item>
    </er-collapse>
    `}),args:{accordion:!0,modelValue:["a"]}};var _,C,E;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: args => ({
    components: {
      ErCollapse,
      ErCollapseItem
    },
    setup() {
      return {
        args
      };
    },
    template: \`
    <er-collapse v-bind="args">
      <er-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </er-collapse-item>
      <er-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </er-collapse-item>
      <er-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </er-collapse-item>
    </er-collapse>
    \`
  }),
  args: {
    accordion: true,
    modelValue: ['a']
  }
}`,...(E=(C=c.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};const oe=["Default"];export{c as Default,oe as __namedExportsOrder,se as default};
