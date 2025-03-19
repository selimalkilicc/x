import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100,  // 100 sanal kullanıcı
  iterations: 500,  // 500 toplam istek
  summaryExport: './summary.json',  // Sonuçları JSON olarak kaydet
  http: {
    timeout: '30s',  // 30 saniye timeout
    retries: 3,  // 3 kere tekrar dene
  },
};

export default function () {
  const url = 'https://petstore.swagger.io/v2/pet/findByStatus?status=available';

  // GET isteği gönderme
  const response = http.get(url);

  // Yanıtı kontrol etme
  check(response, {
    'status is 200': (r) => r.status === 200,
  });

  console.log(`Response Status: ${response.status}`);
  sleep(1);  // İstekler arasında bekleme
}
