const t="none",n=[{name:"PUBLISHED"}],e={ru:"Не найдено",en:"Not found"},s={ru:`<div class="starter">
	<h1>Страница не найдена</h1>
</div>`,en:`<div class="starter">
	<h1>Page not found</h1>
</div>`},a={id:t,tags:n,title:e,content:s},c="home",i=[{name:"PUBLISHED"}],o={ru:"Домашняя страница",en:"Home page"},r={ru:`<div class="starter">
	<h1>Домашняя страница</h1>
	<img src="a5440060877315a0027f2bed7b7c9cc6.png"/>
	<p>Используйте этот документ для создания нового проекта.</p>
</div>`,en:`<div class="starter">
	<h1>Home page</h1>
	<img src="a5440060877315a0027f2bed7b7c9cc6.png"/>
	<p>Use this document as a way to start new project.</p>
</div>`},d=[{name:"a5440060877315a0027f2bed7b7c9cc6.png"}],m={id:c,tags:i,title:o,content:r,files:d},g="sample1",p=[{name:"MENU"},{name:"PUBLISHED"}],l={ru:"Пример страницы 1",en:"Sample page 1"},I={ru:`<div class="starter">
	<h1>Пример страницы 1</h1>
</div>`,en:`<div class="starter">
	<h1>Sample page 1</h1>
</div>`},$={id:g,tags:p,title:l,content:I},h="sample2",f=[{name:"MENU"},{name:"PUBLISHED"}],v={ru:"Пример страницы 2",en:"Sample page 2"},U={ru:`<div class="starter">
	<h1>Пример страницы 2</h1>
	<Page id="fragment.1"/>
</div>`,en:`<div class="starter">
	<h1>Sample page 2</h1>
	<Page id="fragment.1"/>
</div>`},u={id:h,tags:f,title:v,content:U},E="sample3",S=[{name:"MENU"},{name:"PUBLISHED"}],P={ru:"Пример страницы 3",en:"Sample page 3"},b={ru:`<div class="starter">
	<h1>Пример страницы 3</h1>
	<Page id="fragment.2"/>
</div>`,en:`<div class="starter">
	<h1>Sample page 3</h1>
	<Page id="fragment.2"/>
</div>`},J={id:E,tags:S,title:P,content:b},D="sample4",N=[{name:"MENU"},{name:"PUBLISHED"}],R={ru:"Пример страницы 4",en:"Sample page 4"},B={ru:`<div class="starter">
	<h1>Пример страницы 4</h1>
	Контент для {permissions && permissions.includes(PAGES_EDITOR) ? 'редактора' : 'всех кроме редактора'}
</div>`,en:`<div class="starter">
	<h1>Sample page 4</h1>
	Content for {permissions && permissions.includes(PAGES_EDITOR) ? 'editor' : 'all except editor'}
</div>`},G={id:D,tags:N,title:R,content:B},H="sample5",O=[{name:"MENU"},{name:"PUBLISHED"}],L={ru:"Пример страницы 5",en:"Sample page 5"},k={ru:`<div class="starter">
	<h1>Пример страницы 5</h1>
	<Page id="fragment.3" p1="test" p2={123}/>
</div>`,en:`<div class="starter">
	<h1>Sample page 5</h1>
	<Page id="fragment.3" p1="test" p2={123}/>
</div>`},y={id:H,tags:O,title:L,content:k},A="fragment.1",F=[{name:"PUBLISHED"}],M={ru:"Фрагмент 1",en:"Fragment 1"},V={ru:"<p>Фрагмент 1</p>",en:"<p>Fragment 1</p>"},C={id:A,tags:F,title:M,content:V},z="fragment.2",T=[{name:"PUBLISHED"}],Q={ru:"Фрагмент 2",en:"Fragment 2"},X={ru:`<Page id="fragment.1"/>
<img src="a5440060877315a0027f2bed7b7c9cc6.png"/>
<p>Фрагмент 2</p>`,en:`<Page id="fragment.1"/>
<img src="a5440060877315a0027f2bed7b7c9cc6.png"/>
<p>Fragment 2</p>`},x=[{name:"a5440060877315a0027f2bed7b7c9cc6.png"}],W={id:z,tags:T,title:Q,content:X,files:x},Z="fragment.3",_=[{name:"PUBLISHED"}],w={ru:"Фрагмент 3",en:"Fragment 3"},j={ru:`<p>Параметр 1: {p1}</p>
<p>Параметр 2: {p2}</p>`,en:`<p>Parameter 1: {p1}</p>
<p>Parameter 2: {p2}</p>`},Y={id:Z,tags:_,title:w,content:j},q=[a,m,$,u,J,G,y,C,W,Y],K="admin",tt=[{name:"ADMIN"},{name:"MANAGER"},{name:"PAGES_EDITOR"}],nt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjoiQURNSU4sTUFOQUdFUixQQUdFU19FRElUT1IifQ",et={id:K,tags:tt,token:nt},st="editor",at=[{name:"PAGES_EDITOR"}],ct="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZGl0b3IiLCJyb2xlcyI6IlBBR0VTX0VESVRPUiJ9",it={id:st,tags:at,token:ct},ot="manager",rt=[{name:"MANAGER"}],dt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYW5hZ2VyIiwicm9sZXMiOiJNQU5BR0VSIn0",mt={id:ot,tags:rt,token:dt},gt=[et,it,mt],pt={pages:q,users:gt};export{pt as default};
