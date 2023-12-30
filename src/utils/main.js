
// * Rules Disabled
/* eslint-disable indent */

export function inputFile() {
  const inputFile = document.createElement('input');
  inputFile.type = 'file';

  inputFile.addEventListener('change', function () {
    const selectedFile = inputFile.files[0];

    // Lê o conteúdo do arquivo como texto
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = event.target.result;

      // Chama a função para criar o grafo
      console.log(fileContent);
    };

    reader.readAsText(selectedFile);
  });

  inputFile.click();
}