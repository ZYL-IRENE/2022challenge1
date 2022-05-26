from flask import Flask,render_template,jsonify,request,Response
import utils
import json
app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/subgraph-info1-view', methods = ['GET', 'POST'])
def get_info6_view_data():
    graph6_data_node, graph6_data_link = utils.get_data_info6()
    graph6_nodes_all = ['Domain', 'IP', 'Cert', 'Whois_Name', 'Whois_Phone', 'Whois_Email', 'IP_C', 'ASN']
    graph6_links_all = ['VeryStrong', 'Strong', 'Ordinary', 'Weak']

    graph6_res_node = []
    graph6_res_link = []
    for i in range(len(graph6_data_node)):
        node_list = []
        link_list = []
        for value, name in zip(graph6_data_node[i], graph6_nodes_all):
            temp_dict = {'value': value, 'name': name}
            node_list.append(temp_dict)
        for value, name in zip(graph6_data_link[i], graph6_links_all):
            temp_dict = {'value': value, 'name': name}
            link_list.append(temp_dict)
        graph6_res_node.append(node_list)
        graph6_res_link.append(link_list)
    print(graph6_res_node)
    return jsonify({"node": graph6_res_node, "link": graph6_res_link})

@app.route('/subgraph-info2-view', methods = ['GET', 'POST'])
def get_info7_view_data():
    graph7_data_node, graph7_data_link, graph7_data_category = utils.get_data_info7()
    print(graph7_data_node)
    return jsonify({"node": graph7_data_node, "link": graph7_data_link, "category": graph7_data_category})
# get_info7_view_data()
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=7000)
