(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{497:function(s,a,t){s.exports=t.p+"assets/img/shadowsocks-01.925adb96.jpg"},498:function(s,a,t){s.exports=t.p+"assets/img/shadowsocks-02.84dff2bc.jpg"},499:function(s,a,t){s.exports=t.p+"assets/img/shadowsocks-03.f338bf84.jpg"},519:function(s,a,t){"use strict";t.r(a);var e=t(2),r=Object(e.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h2",{attrs:{id:"前言"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[s._v("#")]),s._v(" 前言")]),s._v(" "),e("p",[s._v("请原谅我将标题起的如此杀马特，毕竟正直青年还不想被请去喝茶。")]),s._v(" "),e("p",[s._v("在开始之前需要了解的知识点有 "),e("a",{attrs:{href:"https://help.aliyun.com",target:"_blank",rel:"noopener noreferrer"}},[s._v("ECS"),e("OutboundLink")],1),s._v("、"),e("a",{attrs:{href:"https://www.docker.com",target:"_blank",rel:"noopener noreferrer"}},[s._v("Docker"),e("OutboundLink")],1),s._v("、"),e("a",{attrs:{href:"https://github.com/shadowsocks/shadowsocks-windows",target:"_blank",rel:"noopener noreferrer"}},[s._v("Shadowsocks"),e("OutboundLink")],1)]),s._v(" "),e("p",[s._v('关于Shadowsocks的安装教程网上有很多，而本文只记录一个我认为简单便捷的安装过程和开启"飞升通道"的方法。')]),s._v(" "),e("h2",{attrs:{id:"创建ecs"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建ecs"}},[s._v("#")]),s._v(" 创建ECS")]),s._v(" "),e("p",[s._v("首先你需要一个阿里云账号，注册登录流程略。")]),s._v(" "),e("p",[s._v("接着就可以着手创建一个ECS实例了，但想想我们是用来做什么的，所以请选择大陆以外地区。\n而对于钱包羞涩或者应付突发状况的自用情况，这里强烈建议选择“抢占式实例”以及你所能查看到的最小型号服务器以减轻钱包负荷，并且在短暂的使用后释放它。")]),s._v(" "),e("p",[e("img",{attrs:{src:t(497),alt:"shadowsocks"}})]),s._v(" "),e("p",[s._v("接着"),e("strong",[s._v("重点")]),s._v("来了，我们的需求是达到满速，如图所示，请将带宽拉满并选择按使用量付费。至此，请有观影需求的同学谨慎使用。")]),s._v(" "),e("p",[e("img",{attrs:{src:t(498),alt:"shadowsocks"}})]),s._v(" "),e("h2",{attrs:{id:"部署-docker"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#部署-docker"}},[s._v("#")]),s._v(" 部署 Docker")]),s._v(" "),e("p",[s._v("接着登录ECS部署Docker。因为我选择的操作系统是CentOS，简单列下相关命令，若系统与我相同逐步执行即可。")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("yum install -y yum-utils device-mapper-persistent-data lvm2\nyum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo\nyum -y install docker-ce\nsystemctl start docker\nsystemctl enable docker\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])]),e("h2",{attrs:{id:"一键部署-shadowsocks"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一键部署-shadowsocks"}},[s._v("#")]),s._v(" 一键部署 Shadowsocks")]),s._v(" "),e("p",[s._v("我们部署Docker的目的只是为了简化Shadowsocks的部署过程。在这里，一条命令足矣，请自行替换密码以及端口，并在安全组中开放该端口。")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("docker run --restart=always -e PASSWORD=<password> -e METHOD=aes-256-gcm -p <server-port>:8388 -p <server-port>:8388/udp -d shadowsocks/shadowsocks-libev\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:"终"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#终"}},[s._v("#")]),s._v(" 终")]),s._v(" "),e("p",[s._v("将对应参数填入Shadowsocks客户端的服务器列表并启动就可以开始体验丝般顺滑了。70ms，100M是不是比家用宽带还凶猛。")]),s._v(" "),e("p",[e("img",{attrs:{src:t(499),alt:"shadowsocks"}})]),s._v(" "),e("p",[s._v("最终提示，请谨慎使用。")])])}),[],!1,null,null,null);a.default=r.exports}}]);