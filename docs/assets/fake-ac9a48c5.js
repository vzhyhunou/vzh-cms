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
</div>`},d=[{name:"a5440060877315a0027f2bed7b7c9cc6.png"}],g={id:c,tags:i,title:o,content:r,files:d},p="sample1",m=[{name:"MENU"},{name:"PUBLISHED"}],l={ru:"Пример страницы 1",en:"Sample page 1"},I={ru:`<div class="starter">
	<h1>Пример страницы 1</h1>
</div>`,en:`<div class="starter">
	<h1>Sample page 1</h1>
</div>`},$={id:p,tags:m,title:l,content:I},f="sample2",h=[{name:"MENU"},{name:"PUBLISHED"}],S={ru:"Пример страницы 2",en:"Sample page 2"},v={ru:`<div class="starter">
	<h1>Пример страницы 2</h1>
	<Page id="fragment.1"/>
</div>`,en:`<div class="starter">
	<h1>Sample page 2</h1>
	<Page id="fragment.1"/>
</div>`},U={id:f,tags:h,title:S,content:v},u="sample3",E=[{name:"MENU"},{name:"PUBLISHED"}],P={ru:"Пример страницы 3",en:"Sample page 3"},J={ru:`<div class="starter">
	<h1>Пример страницы 3</h1>
	<Page id="fragment.2"/>
</div>`,en:`<div class="starter">
	<h1>Sample page 3</h1>
	<Page id="fragment.2"/>
</div>`},b={id:u,tags:E,title:P,content:J},N="sample4",O=[{name:"MENU"},{name:"PUBLISHED"}],y={ru:"Пример страницы 4",en:"Sample page 4"},D={ru:`<div class="starter">
	<h1>Пример страницы 4</h1>
	Контент для {permissions && permissions.includes(context.roles.PAGES_EDITOR) ? 'редактора' : 'всех кроме редактора'}
</div>`,en:`<div class="starter">
	<h1>Sample page 4</h1>
	Content for {permissions && permissions.includes(context.roles.PAGES_EDITOR) ? 'editor' : 'all except editor'}
</div>`},R={id:N,tags:O,title:y,content:D},B="sample5",G=[{name:"MENU"},{name:"PUBLISHED"}],H={ru:"Пример страницы 5",en:"Sample page 5"},L={ru:`<div class="starter">
	<h1>Пример страницы 5</h1>
	<Page id="fragment.3" p1="test" p2={123}/>
</div>`,en:`<div class="starter">
	<h1>Sample page 5</h1>
	<Page id="fragment.3" p1="test" p2={123}/>
</div>`},k={id:B,tags:G,title:H,content:L},x="fragment.1",A=[{name:"PUBLISHED"}],C={ru:"Фрагмент 1",en:"Fragment 1"},F={ru:"<p>Фрагмент 1</p>",en:"<p>Fragment 1</p>"},M={id:x,tags:A,title:C,content:F},V="fragment.2",z=[{name:"PUBLISHED"}],T={ru:"Фрагмент 2",en:"Fragment 2"},Q={ru:`<Page id="fragment.1"/>
<img src="a5440060877315a0027f2bed7b7c9cc6.png"/>
<p>Фрагмент 2</p>`,en:`<Page id="fragment.1"/>
<img src="a5440060877315a0027f2bed7b7c9cc6.png"/>
<p>Fragment 2</p>`},X=[{name:"a5440060877315a0027f2bed7b7c9cc6.png"}],W={id:V,tags:z,title:T,content:Q,files:X},Z="fragment.3",_=[{name:"PUBLISHED"}],w={ru:"Фрагмент 3",en:"Fragment 3"},j={ru:`<p>Параметры</p><code>{JSON.stringify(props)}</code>
<p>Контекст</p><code>{JSON.stringify(context)}</code>
<p>Разрешения</p><code>{JSON.stringify(permissions)}</code>`,en:`<p>Properties</p><code>{JSON.stringify(props)}</code>
<p>Context</p><code>{JSON.stringify(context)}</code>
<p>Permissions</p><code>{JSON.stringify(permissions)}</code>`},Y={id:Z,tags:_,title:w,content:j},q=[a,g,$,U,b,R,k,M,W,Y],K="admin",tt=[{name:"ADMIN"},{name:"MANAGER"},{name:"PAGES_EDITOR"}],nt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjoiQURNSU4sTUFOQUdFUixQQUdFU19FRElUT1IifQ",et={id:K,tags:tt,token:nt},st="editor",at=[{name:"PAGES_EDITOR"}],ct="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZGl0b3IiLCJyb2xlcyI6IlBBR0VTX0VESVRPUiJ9",it={id:st,tags:at,token:ct},ot="manager",rt=[{name:"MANAGER"}],dt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYW5hZ2VyIiwicm9sZXMiOiJNQU5BR0VSIn0",gt={id:ot,tags:rt,token:dt},pt=[et,it,gt],mt={pages:q,users:pt};export{mt as default};
