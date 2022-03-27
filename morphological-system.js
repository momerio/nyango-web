const DICT_PATH = "dict";

// window.onload = (event) => {
//     // テスト用
// }


function translateNyango(tokens) {
    // にゃん語変換関数
    // console.log(tokens);

    // 結果例:
    // basic_form: "吾輩"
    // conjugated_form: "*"
    // conjugated_type: "*"
    // pos: "名詞"
    // pos_detail_1: "代名詞"
    // pos_detail_2: "一般"
    // pos_detail_3: "*"
    // pronunciation: "ワガハイ"
    // reading: "ワガハイ"
    // surface_form: "吾輩"
    // word_id: 43980
    // word_position: 1
    // word_type: "KNOWN"

    var translated_text = ""; //変換結果

    // 猫語辞書
    nekogo_regex = /ナ|ヌ|ネ|サ|ナ|ヤ|ラ|ザ|バ/;

    tokens.forEach((token) => {
        if ((token.reading == "ヌ" && token.pos == "助動詞")
            || (token.reading == "ナイ" && token.pos == "形容詞")) {
            // 否定形の助動詞「ぬ」を「にゃいにゃ」に変換
            translated_text += "にゃい";
        }
        else if (token.reading == "ネコ") {
            // 「ネコ」だと「にゃん」に変換
            translated_text += "にゃん";
        }
        else if (nekogo_regex.test(token.reading) && ["名詞", "助動詞", "形容詞", "動詞"].includes(token.pos)) {
            // 猫語が含まれている場合「にゃ」に変換
            token.reading.split("").forEach((char) => {
                var temp_char = "";
                console.log(char, nekogo_regex.test(char));
                if (nekogo_regex.test(char)) {
                    temp_char = "にゃ";
                } else {
                    temp_char = char;
                }
                translated_text += temp_char;
            });
        }
        else if ((token.reading == "アル" && token.pos == "助動詞") ||
            (token.reading == "デス" && token.pos == "助動詞") ||
            (token.reading == "マス" && token.pos == "助動詞") ||
            (token.reading == "ウ" && token.pos == "助動詞") ||
            (token.reading == "カ" && token.pos == "助詞")) {
            translated_text += token.surface_form + "にゃ";
        }
        else {
            translated_text += token.surface_form;
        }
    });

    return translated_text;
}

function morphologicalSystem() {

    // 変換テキスト取得
    const text = document.getElementById("input-text").value;

    document.getElementById("output-text").innerHTML = "実行中……";

    //形態素解析の実行
    kuromoji.builder({ dicPath: DICT_PATH }).build((err, tokenizer) => {

        const tokens = tokenizer.tokenize(text);// 解析データの取得
        var output_text = "" //実行結果
        output_text = translateNyango(tokens); //にゃん語変換


        document.getElementById("output-text").innerHTML = output_text; //実行結果を表示
    });
}