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
    idx = "子图1-1"
    if request.method == 'POST':
        idx = request.post.get("graphTypes")
    nodes_all = ['Domain', 'IP', 'Cert', 'Whois_Name', 'Whois_Phone', 'Whois_Email', 'IP_C', 'ASN']
    links_all = ['VeryStrong', 'Strong', 'Ordinary', 'Weak']
    node_list = []
    link_list = []
    for value,name in  zip(data_node[int(idx[-1])-1],nodes_all):
        temp_dict = {'value': value, 'name':name}
        node_list.append(temp_dict)
    for value,name in  zip(data_link[int(idx[-1])-1],links_all):
        temp_dict = {'value': value, 'name':name}
        link_list.append(temp_dict)
    return jsonify({"node":node_list, "link":link_list})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
