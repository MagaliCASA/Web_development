rm -rf backend/public/*
cd frontend/
npm run build
cd build
cp -r * ../../backend/public
cd ../..
vercel deploy --prod