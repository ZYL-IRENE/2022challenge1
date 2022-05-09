import pandas as pd
import numpy as np
import time

time1 = time.time()
pd_link = pd.read_csv('../../Link.csv')
pd_node = pd.read_csv('../../Node.csv')

links_all = ['r_cert', 'r_subdomain', 'r_request_jump', 'r_dns_a', 'r_whois_name', 'r_whois_email', 'r_whois_phone',
             'r_cert_chain', 'r_cname', 'r_asn', 'r_cidr']
nodes_all = ['Domain', 'IP', 'Cert', 'Whois_Name', 'Whois_Phone', 'Whois_Email', 'IP_C', 'ASN']
industry_all = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

links_dict = {}  # links_dict[relation name] will show the corresponding data
nodes_dict = {}  # nodes_dict[relation name] will show the corresponding data
nodes_industry = {}  # show the data sorted by industry

res_links = set()  # store all links
res_nodes = []  # store all nodes
res_node_type = {}  # store all node_types

samples = [
    {'Domain_c58c149eec59bb14b0c102a0f303d4c20366926b5c3206555d2937474124beb9',
     'Domain_f3554b666038baffa5814c319d3053ee2c2eb30d31d0ef509a1a463386b69845'},
    {'IP_400c19e584976ff2a35950659d4d148a3d146f1b71692468132b849b0eb8702c',
     'Domain_b10f98a9b53806ccd3a5ee45676c7c09366545c5b12aa96955cde3953e7ad058'},
    {'Domain_24acfd52f9ceb424d4a2643a832638ce1673b8689fa952d9010dd44949e6b1d9',
     'Domain_9c72287c3f9bb38cb0186acf37b7054442b75ac32324dfd245aed46a03026de1',
     'Domain_717aa5778731a1f4d6f0218dd3a27b114c839213b4af781427ac1e22dc9a7dea',
     'Domain_8748687a61811032f0ed1dcdb57e01efef9983a6d9c236b82997b07477e66177',
     'Whois_Phone_f4a84443fb72da27731660695dd00877e8ce25b264ec418504fface62cdcbbd7'},
    {'IP_7e730b193c2496fc908086e8c44fc2dbbf7766e599fabde86a4bcb6afdaad66e',
     'Cert_6724539e5c0851f37dcf91b7ac85cb35fcd9f8ba4df0107332c308aa53d63bdb'},
    {'Whois_Phone_fd0a3f6712ff520edae7e554cb6dfb4bdd2af1e4a97a39ed9357b31b6888b4af',
     'IP_21ce145cae6730a99300bf677b83bbe430cc0ec957047172e73659372f0031b8',
     'Domain_7939d01c5b99c39d2a0f2b418f6060b917804e60c15309811ef4059257c0818a',
     'Domain_587da0bac152713947db682a5443ef639e35f77a3b59e246e8a07c5eccae67e5'}
]
idx = 1
test_nodes = samples[idx]

for i in links_all:
    links_dict[i] = pd_link[pd_link['relation'] == i]
for i in nodes_all:
    nodes_dict[i] = pd_node[pd_node['type'] == i]
for i in industry_all:
    nodes_industry[i] = pd_node[pd_node['industry'].str.contains(i)]
nodes_industry['Null'] = pd_node[pd_node['industry'] == "[]"]

time2 = time.time()


def get_type(node_id: str) -> str:
    if node_id[0] == 'D':
        return 'Domain'
    elif node_id[0] == 'I' and node_id[2] != 'C':
        return 'IP'
    elif node_id[0] == 'C':
        return 'Cert'
    elif node_id[0] == 'W' and node_id[6] == 'N':
        return 'Whois_Name'
    elif node_id[0] == 'W' and node_id[6] == 'P':
        return 'Whois_Phone'
    elif node_id[0] == 'W' and node_id[6] == 'E':
        return 'Whois_Email'
    elif node_id[0] == 'I' and node_id[2] == 'C':
        return 'IP_C'
    else:
        return 'ASN'


def search_source(node: str):
    return pd_link[pd_link['source'] == node]


def search_target(node: str):
    return pd_link[pd_link['target'] == node]


def get_neighbors(node: str, is_contain_empty_industry: bool = True, cert_n: int = 100):
    temp_set = set()
    temp_dict = {}

    if is_contain_empty_industry:
        if node[0] != 'C':
            for _, row1 in search_source(node).iterrows():
                temp_set.add(row1['target'])
                temp_dict[row1['target']] = row1['relation']
                res_links.add((row1['relation'], row1['source'], row1['target']))
            for _, row2 in search_target(node).iterrows():
                temp_set.add(row2['source'])
                temp_dict[row2['source']] = row2['relation']
                res_links.add((row2['relation'], row2['source'], row2['target']))
        else:
            count = 0
            for _, row2 in search_target(node).iterrows():
                temp_set.add(row2['source'])
                temp_dict[row2['source']] = row2['relation']
                res_links.add((row2['relation'], row2['source'], row2['target']))
                count += 1
                if count == cert_n:
                    break
            for _, row1 in search_source(node).iterrows():
                temp_set.add(row1['target'])
                temp_dict[row1['target']] = row1['relation']
                res_links.add((row1['relation'], row1['source'], row1['target']))
    else:
        if node[0] != 'C':
            for _, row1 in search_source(node).iterrows():
                if pd_node[pd_node.id == row1['target']]['industry'].values[0] != "[]":
                    temp_set.add(row1['target'])
                    temp_dict[row1['target']] = row1['relation']
                    res_links.add((row1['relation'], row1['source'], row1['target']))
            for _, row2 in search_target(node).iterrows():
                if pd_node[pd_node.id == row2['source']]['industry'].values[0] != "[]":
                    temp_set.add(row2['source'])
                    temp_dict[row2['source']] = row2['relation']
                    res_links.add((row2['relation'], row2['source'], row2['target']))
        else:
            count = 0
            cert_n = 100
            for _, row2 in search_target(node).iterrows():
                if pd_node[pd_node.id == row2['source']]['industry'].values[0] != "[]":
                    temp_set.add(row2['source'])
                    temp_dict[row2['source']] = row2['relation']
                    res_links.add((row2['relation'], row2['source'], row2['target']))
                    count += 1
                    if count == cert_n:
                        break
            for _, row1 in search_source(node).iterrows():
                if pd_node[pd_node.id == row1['target']]['industry'].values[0] != "[]":
                    temp_set.add(row1['target'])
                    temp_dict[row1['target']] = row1['relation']
                    res_links.add((row1['relation'], row1['source'], row1['target']))
    return temp_set, temp_dict


def get_network(node: str, is_contain_empty_industry: bool = True, cert_n: int = 100):
    neighbors_layer1, relation_layer1 = get_neighbors(node, is_contain_empty_industry, cert_n)
    neighbors_layer2 = set()
    neighbors_layer3 = set()
    print(neighbors_layer1)
    for neighbor in relation_layer1:
        print(neighbor + ' start')
        relation_idx = links_all.index(relation_layer1[neighbor])
        if relation_idx == 0 or 4 <= relation_idx <= 6:
            m1 = get_neighbors(neighbor, is_contain_empty_industry, cert_n)[0]
            neighbors_layer2 = neighbors_layer2 | m1
        elif 1 <= relation_idx <= 3:
            m1, r1 = get_neighbors(neighbor, is_contain_empty_industry, cert_n)
            neighbors_layer2 = neighbors_layer2 | m1
            for neighbor_2 in m1:
                relation_idx_2 = links_all.index(r1[neighbor_2])
                if 1 <= relation_idx_2 <= 6:
                    m2 = get_neighbors(neighbor_2)[0]
                    neighbors_layer3 = neighbors_layer3 | m2
        print(neighbor + ' finish')
    neighbor_all = neighbors_layer1 | neighbors_layer2 | neighbors_layer3
    return neighbor_all, neighbors_layer1, neighbors_layer2, neighbors_layer3


def operate():
    set_all = set()
    for test_node in test_nodes:
        # network = get_network(test_node, is_contain_empty_industry=False, cert_n=50)[0]
        network = get_network(test_node)[0]
        set_all = set_all | network
    for node in set_all:
        res_nodes.append([node, get_type(node)])
    print(len(res_nodes))
    print(len(res_links))


def load():
    pd_res_node = pd.DataFrame(res_nodes)
    pd_res_node.columns = ['id', 'type']
    pd_count_node = pd_res_node['type'].value_counts()

    pd_res_link = pd.DataFrame(res_links)
    pd_res_link.columns = ['relation', 'target', 'source']
    pd_count_temp = pd_res_link['relation'].value_counts()

    for i in links_all:
        if i not in pd_count_temp.index:
            pd_count_temp[i] = 0
    print(pd_count_temp)

    pd_count_link = pd.DataFrame(index=['VeryStrong','Strong','Ordinary','Weak'],columns=['num'])
    pd_count_link.loc['VeryStrong','num'] = pd_count_temp['r_cert'] + pd_count_temp['r_subdomain'] + pd_count_temp['r_request_jump'] + pd_count_temp['r_dns_a']
    pd_count_link.loc['Strong', 'num'] = pd_count_temp['r_whois_name'] + pd_count_temp['r_whois_email'] + pd_count_temp['r_whois_phone']
    pd_count_link.loc['Ordinary', 'num'] = pd_count_temp['r_cname'] + pd_count_temp['r_cert_chain']
    pd_count_link.loc['Weak', 'num'] = pd_count_temp['r_asn'] + pd_count_temp['r_cidr']

    pd_count_node.to_csv('./output/' + str(idx + 1) + '_node_type.csv', sep=',')
    pd_count_link.to_csv('./output/' + str(idx + 1) + '_link_type.csv', sep=',')
    pd_res_node.to_csv('./output/' + str(idx + 1) + '_node.csv', sep=',')
    pd_res_link.to_csv('./output/' + str(idx + 1) + '_link.csv', sep=',')


operate()
time3 = time.time()
load()
time4 = time.time()
print('Time: ', time3 - time1)
print('Time for initializing: ', time2 - time1)
print('Time for operating: ', time3 - time2)
print('Time for loading', time4 - time3)
