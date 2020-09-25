const developemt = false;
(function () {
  let app = document.createElement('div');
  let progressId = Math.random().toString(36).substring(7);
  let progressHolderId = Math.random().toString(36).substring(7);
  app.id = 'app';
  document.body.prepend(app);
  let progressHolder = document.createElement('div');
  progressHolder.id = progressHolderId;
  progressHolder.classList = 'progress';
  progressHolder.style.margin = '10%';
  progressHolder.style.height = '2rem';

  let progress = document.createElement('div');
  progress.id = progressId;

  progress.style.height = '2rem';
  progress.classList = 'progress-bar';
  progressHolder.append(progress);
  document.body.append(progressHolder);

  let stylesheets = [
    // add your css here
    './content/css/bootstrap.min.css',
    './content/css/initial.css',
    './content/fonts/font.css',
    './content/css/react-toggle.css',
    './content/css/project.css',
  ];
  stylesheets.forEach((href) => {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.append(link);
  });
  // add scripts here

  let scripts = [
    './content/js/jquery-3.5.0.min.js',
    './content/js/popper.min.js',
    './content/js/bootstrap.min.js',
  ];
  // developemt
  if (location.href.includes('localhost') || developemt) {
    scripts.push(location.origin + '/bundle.js');
  } else {
    scripts.push('./content/js/bundle.js');
  }
  let startPosition = 0;
  function scriptLoader() {
    let script = document.createElement('script');
    let appHolder = document.getElementById('app');
    let progressHolder = document.getElementById(progressHolderId);
    appHolder.style.display = 'none';
    progressHolder.style.display = 'block';
    script.src = scripts[startPosition];
    script.addEventListener('load', () => {
      startPosition++;
      let compleatePersentage = (startPosition / scripts.length) * 100;
      let progress = document.getElementById(progressId);
      progress.style.width = compleatePersentage + '%';
      progress.innerHTML =
        'Script Loaded ' + Math.round(compleatePersentage) + '%';
      if (scripts.length > startPosition) {
        setTimeout(() => {
          scriptLoader();
        }, 300);
      } else {
        setTimeout(() => {
          appHolder.style.display = 'block';
          progressHolder.style.display = 'none';
        }, 300);
      }
    });
    document.body.append(script);
  }
  scriptLoader();
})();
