from flask import Flask,render_template,jsonify,request,Response
import utils
import json
app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/data-info3-view', methods = ['GET', 'POST'])
def get_info3_view_data():
    data_node, data_link = utils.get_data_info3()
    nodes_all = ['Domain', 'IP', 'Cert', 'Whois_Name', 'Whois_Phone', 'Whois_Email', 'IP_C', 'ASN']
    links_all = ['VeryStrong', 'Strong', 'Ordinary', 'Weak']


    res_node = []
    res_link = []
    for i in range(len(data_node)):
        node_list = []
        link_list = []
        for value, name in zip(data_node[i], nodes_all):
            temp_dict = {'value': value, 'name': name}
            node_list.append(temp_dict)
        for value, name in zip(data_link[i], links_all):
            temp_dict = {'value': value, 'name': name}
            link_list.append(temp_dict)
        res_node.append(node_list)
        res_link.append(link_list)
    print(res_node)
    return jsonify({"node": res_node, "link": res_link})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=7000)
