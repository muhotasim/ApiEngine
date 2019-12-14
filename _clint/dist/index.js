[
  '/content/css/bootstrap.min.css',
  '/content/css/font-awesome.min.css',
  '/content/css/react-datepicker.css',
  '/content/css/style.css',
  '/content/css/page.css',
  '/content/css/project.css',
].forEach((v)=>{
  let link = document.createElement('link');
  link.rel='stylesheet';
  link.href=v;
  document.head.appendChild(link);
});

[
  '/content/js/jquery-3.4.1.min.js',
  '/content/js/d3.min.js',
  '/content/js/d3-scale-chromatic.v1.min.js',
  '/content/js/notify.js',
  '/content/js/bootstrap.min.js',
  '/bundle.js',
].forEach((v)=>{
  let link = document.createElement('script');
  link.src=v;
  document.body.appendChild(link);
});
