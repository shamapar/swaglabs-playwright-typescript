# Plawright framework for SwagLabs Application

### Pre-requisite
Node JS
visual Studio

### clone repository
```
git clone https://github.com/shamapar/swaglabs-playwright-typescript.git
```

### install dependencies
```
npm install
```

### install browser
```
npx playwright install --with-deps chromium
```
for more details check official playwright document: https://playwright.dev/docs/browsers

run commands
```
npx playwright --project=chromium test
npx playwright test --project=chromium --headed
npx playwright test --project=chromium --ui
```

