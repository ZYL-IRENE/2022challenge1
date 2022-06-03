# coding = utf-8
from flask import Flask,render_template,jsonify,request,Response
import utils
import json
import pandas as pd
app = Flask(__name__)

samples = [
    ['Domain_c58c149eec59bb14b0c102a0f303d4c20366926b5c3206555d2937474124beb9',
     'Domain_f3554b666038baffa5814c319d3053ee2c2eb30d31d0ef509a1a463386b69845'],
    ['IP_400c19e584976ff2a35950659d4d148a3d146f1b71692468132b849b0eb8702c',
     'Domain_b10f98a9b53806ccd3a5ee45676c7c09366545c5b12aa96955cde3953e7ad058'],
    ['Domain_24acfd52f9ceb424d4a2643a832638ce1673b8689fa952d9010dd44949e6b1d9',
     'Domain_9c72287c3f9bb38cb0186acf37b7054442b75ac32324dfd245aed46a03026de1',
     'Domain_717aa5778731a1f4d6f0218dd3a27b114c839213b4af781427ac1e22dc9a7dea',
     'Domain_8748687a61811032f0ed1dcdb57e01efef9983a6d9c236b82997b07477e66177',
     'Whois_Phone_f4a84443fb72da27731660695dd00877e8ce25b264ec418504fface62cdcbbd7'],
    ['IP_7e730b193c2496fc908086e8c44fc2dbbf7766e599fabde86a4bcb6afdaad66e',
     'Cert_6724539e5c0851f37dcf91b7ac85cb35fcd9f8ba4df0107332c308aa53d63bdb'],
    ['Whois_Phone_fd0a3f6712ff520edae7e554cb6dfb4bdd2af1e4a97a39ed9357b31b6888b4af',
     'IP_21ce145cae6730a99300bf677b83bbe430cc0ec957047172e73659372f0031b8',
     'Domain_7939d01c5b99c39d2a0f2b418f6060b917804e60c15309811ef4059257c0818a',
     'Domain_587da0bac152713947db682a5443ef639e35f77a3b59e246e8a07c5eccae67e5'],
    ['Domain_75213f3ffa988b2b524a633048e6617513f0427f394b5fecff09c06ac24b9278'],  # 6 A,B 154 * 中
    ['Domain_5198e04060720abfd92a15aefeeec2c50b4de5b537ab9486673a14e901274585'],  # 7 G 113 * 小
    ['Domain_8fa3cca3afda01abc25100119653634f4f44a0f9eb97830c029510034a5a7638'],  # 8 I 35 * 小
    ['Domain_0f3d5e29ea794b4b431335ff8cc86a1d37e335ef7ee41f26ca12012f8b2d6ab9'],  # 9 B 50 * 中
    ['Whois_Name_c8b8f7928d919ef75276fc12a3f3df5283988d9ff1da465703d08f1f5c8a085e'],  # 14 Whois_Name 554 * 大
    ['Domain_28d26091ef22a5472607d2d3d29db879fd5ee60b4d2bf5709e5c5165c56fa1c8',  # 33
     'Domain_513cc143f598864d825b5352742c85d0e325baa5917efce7b3df69753badd443',  # 37
     'Domain_c6fb2192fe6ba2de0f1258c168f34382df63658359ee831bbda9f669db2e0499',  # 6
     'Domain_3063a0302039d8eefbfba6d41d1d123e3344661a9038f40859d0c859d22cf528'],  # 23 (16) C,E,A,B 大
    ['Domain_28d26091ef22a5472607d2d3d29db879fd5ee60b4d2bf5709e5c5165c56fa1c8']  # True 200 0.3
]


@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')


def getNodeCsv(idx, is_contain_empty_industry, cert_n, ratio):
    filepath = 'static/dataset/'+str(idx)+'_'+str(is_contain_empty_industry)+'_'+str(cert_n)+'_'+str(ratio)+'_nodes.csv'
    data = pd.read_csv(filepath)
    return data


def getLinkCsv(idx, is_contain_empty_industry, cert_n, ratio):
    filepath = 'static/dataset/'+str(idx)+'_'+str(is_contain_empty_industry)+'_'+str(cert_n)+'_'+str(ratio)+'_links.csv'
    data = pd.read_csv(filepath)
    return data


def getHopCountCsv(idx, is_contain_empty_industry, cert_n, ratio):
    filepath = 'static/dataset/'+str(idx)+'_'+str(is_contain_empty_industry)+'_'+str(cert_n)+'_'+str(ratio)+'_hopcount.csv'
    data = pd.read_csv(filepath)
    return data


@app.route('/register', methods=['GET'])
def getId_Name():
    id = request.values.get('id')
    is_contain_empty_industry = request.values.get('is_contain_empty_industry')
    cert_n = request.values.get('cert_n')
    ratio = request.values.get('ratio')
    id = id[3:]
    idx = 0
    for i in range(11):
        if id in samples[i]:
            idx = i + 1
            break
    nodes = getNodeCsv(idx, is_contain_empty_industry, cert_n, ratio)
    nodesData = []
    for index, row in nodes.iterrows():
        temp = {'id': row['id'], 'name': row['name'], 'type': row['type'], 'industry': row['industry'], 'isCenter': row['isCenter']}
        nodesData.append(temp)

    links = getLinkCsv(idx, is_contain_empty_industry, cert_n, ratio)
    linksData = []
    for index, row in links.iterrows():
        temp = {'source': row['source'], 'target': row['target'], 'relation': row['relation'], 'isKeyline': row['isKeyline']}
        linksData.append(temp)

    hopcount = getHopCountCsv(idx, is_contain_empty_industry, cert_n, ratio)
    hopcountData = {'hop1': str(hopcount['hop1'].values[0]), 'hop2': str(hopcount['hop2'].values[0]),
                    'hop3': str(hopcount['hop3'].values[0]), 'total': str(hopcount['total'].values[0])}

    dic = {'nodes': nodesData, 'links': linksData, 'hopcount': hopcountData}
    return jsonify(dic)

@app.route('/subgraph-info1-view', methods = ['GET', 'POST'])
def get_info6_view_data():
    graph6_data_node, graph6_data_link, graph6_data_type = utils.get_data_info6()
    graph6_nodes_all = ['Domain', 'IP', 'Cert', 'Whois_Name', 'Whois_Phone', 'Whois_Email', 'IP_C', 'ASN']
    graph6_links_all = ['很强', '强', '中', '弱']
    graph6_types_all = ['涉黄','涉赌','涉骗','涉毒','涉枪','黑客','非法交易平台','非法支付平台','其他']
    graph6_res_node = []
    graph6_res_link = []
    graph6_res_type = []
    for i in range(len(graph6_data_node)):
        node_list = []
        link_list = []
        type_list = []
        for value, name in zip(graph6_data_node[i], graph6_nodes_all):
            temp_dict = {'value': value, 'name': name}
            node_list.append(temp_dict)
        for value, name in zip(graph6_data_link[i], graph6_links_all):
            temp_dict = {'value': value, 'name': name}
            link_list.append(temp_dict)
        for value, name in zip(graph6_data_type[i], graph6_types_all):
            temp_dict = {'value': value, 'name': name}
            type_list.append(temp_dict)
        graph6_res_node.append(node_list)
        graph6_res_link.append(link_list)
        graph6_res_type.append(type_list)
    print(graph6_res_node)
    print(graph6_res_type)
    return jsonify({"node": graph6_res_node, "link": graph6_res_link, "type": graph6_res_type})

@app.route('/subgraph-info2-view', methods = ['GET', 'POST'])
def get_info7_view_data():
    graph7_data_node, graph7_data_link, graph7_data_category = utils.get_data_info7()
    # print(graph7_data_node)
    return jsonify({"node": graph7_data_node, "link": graph7_data_link, "category": graph7_data_category})
# get_info7_view_data()
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000)
