const t="none",n=[{name:"PUBLISHED"}],e={ru:"Не найдено",en:"Not found"},s={ru:`<div class="starter">
	<h1>Страница не найдена</h1>
</div>`,en:`<div class="starter">
	<h1>Page not found</h1>
</div>`},a={id:t,tags:n,title:e,content:s},c="home",i=[{name:"PUBLISHED"}],o={ru:"Домашняя страница",en:"Home page"},d={ru:`<div class="starter">
	<h1>Домашняя страница</h1>
	<img src="a5440060877315a0027f2bed7b7c9cc6.png"/>
	<p>Используйте этот документ для создания нового проекта.</p>
</div>`,en:`<div class="starter">
	<h1>Home page</h1>
	<img src="a5440060877315a0027f2bed7b7c9cc6.png"/>
	<p>Use this document as a way to start new project.</p>
</div>`},r=[{name:"a5440060877315a0027f2bed7b7c9cc6.png"}],m={id:c,tags:i,title:o,content:d,files:r},g="sample1",l=[{name:"MENU"},{name:"PUBLISHED"}],p={ru:"Пример страницы 1",en:"Sample page 1"},I={ru:`<div class="starter">
	<h1>Пример страницы 1</h1>
</div>`,en:`<div class="starter">
	<h1>Sample page 1</h1>
</div>`},$={id:g,tags:l,title:p,content:I},h="sample2",f=[{name:"MENU"},{name:"PUBLISHED"}],U={ru:"Пример страницы 2",en:"Sample page 2"},v={ru:`<div class="starter">
	<h1>Пример страницы 2</h1>
	<Page id="fragment.1"/>
</div>`,en:`<div class="starter">
	<h1>Sample page 2</h1>
	<Page id="fragment.1"/>
</div>`},E={id:h,tags:f,title:U,content:v},u="sample3",S=[{name:"MENU"},{name:"PUBLISHED"}],P={ru:"Пример страницы 3",en:"Sample page 3"},b={ru:`<div class="starter">
	<h1>Пример страницы 3</h1>
	<Page id="fragment.2"/>
</div>`,en:`<div class="starter">
	<h1>Sample page 3</h1>
	<Page id="fragment.2"/>
</div>`},J={id:u,tags:S,title:P,content:b},R="sample4",D=[{name:"MENU"},{name:"PUBLISHED"}],N={ru:"Пример страницы 4",en:"Sample page 4"},G={ru:`<div class="starter">
	<h1>Пример страницы 4</h1>
	Контент для {permissions && permissions.includes(PAGES_EDITOR) ? 'редактора' : 'всех кроме редактора'}
</div>`,en:`<div class="starter">
	<h1>Sample page 4</h1>
	Content for {permissions && permissions.includes(PAGES_EDITOR) ? 'editor' : 'all except editor'}
</div>`},O={id:R,tags:D,title:N,content:G},B="fragment.1",k=[{name:"PUBLISHED"}],y={ru:"Фрагмент 1",en:"Fragment 1"},H={ru:"<p>Фрагмент 1</p>",en:"<p>Fragment 1</p>"},A={id:B,tags:k,title:y,content:H},L="fragment.2",V=[{name:"PUBLISHED"}],C={ru:"Фрагмент 2",en:"Fragment 2"},F={ru:`<Page id="fragment.1"/>
<img src="a5440060877315a0027f2bed7b7c9cc6.png"/>
<p>Фрагмент 2</p>`,en:`<Page id="fragment.1"/>
<img src="a5440060877315a0027f2bed7b7c9cc6.png"/>
<p>Fragment 2</p>`},M=[{name:"a5440060877315a0027f2bed7b7c9cc6.png"}],z={id:L,tags:V,title:C,content:F,files:M},T=[a,m,$,E,J,O,A,z],Q="admin",X=[{name:"ADMIN"},{name:"MANAGER"},{name:"PAGES_EDITOR"}],x="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjoiQURNSU4sTUFOQUdFUixQQUdFU19FRElUT1IifQ",W={id:Q,tags:X,token:x},Z="editor",_=[{name:"PAGES_EDITOR"}],w="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZGl0b3IiLCJyb2xlcyI6IlBBR0VTX0VESVRPUiJ9",j={id:Z,tags:_,token:w},Y="manager",q=[{name:"MANAGER"}],K="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYW5hZ2VyIiwicm9sZXMiOiJNQU5BR0VSIn0",tt={id:Y,tags:q,token:K},nt=[W,j,tt],et={pages:T,users:nt};export{et as default};
