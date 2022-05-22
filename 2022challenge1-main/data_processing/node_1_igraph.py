import pandas as pd
import numpy as np
import igraph as ig
import time

time1 = time.time()
pd_link = pd.read_csv('../Link.csv')
pd_node = pd.read_csv('../Node.csv')
links_all = ['r_cert', 'r_subdomain', 'r_request_jump', 'r_dns_a', 'r_whois_name', 'r_whois_email', 'r_whois_phone',
             'r_cert_chain', 'r_cname', 'r_asn', 'r_cidr']
nodes_all = ['Domain', 'IP', 'Cert', 'Whois_Name', 'Whois_Phone', 'Whois_Email', 'IP_C', 'ASN']
industry_all = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
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
     'Domain_587da0bac152713947db682a5443ef639e35f77a3b59e246e8a07c5eccae67e5']
]



#  根据Link.csv初始化
g = ig.Graph.TupleList(pd_link[['source', 'target']].itertuples(index=False), directed=True, vertex_name_attr='id')
g.es['relation'] = list(pd_link['relation'])


def name_to_id(names: list):
    return [pd_node[pd_node['name'] == i]['id'].values[0] for i in names]


def get_type(node_id: str):
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


def return_by_id(id_list):
    """
        return information of the nodes in id_list
    """
    name_list = []
    type_list = []
    industry_list = []
    for i in id_list:
        target = pd_node[pd_node['id'] == i]
        name_list.append(target['name'].values[0])
        type_list.append(target['type'].values[0])
        industry_list.append(target['industry'].values[0])
    return name_list, type_list, industry_list



def get_node(node_id):
    """
        get the vertice(node) based on its id
    """
    return g.vs.find(id=node_id)


def is_node_empty(node_idx):
    """
        judge whether the industry of the node is empty
    :param node_idx: index
    :return: bool
    """
    return pd_node[pd_node.id == g.vs[node_idx]['id']]['industry'].values[0] == "[]"


def get_neighbors(node_id, is_contain_empty_industry: bool = True, cert_n: int = 100):
    """
        get the indexes of the neighbors for a certain node
    :param node_id: id
    :return: list of indexes of the neighbors
    """
    node = get_node(node_id)
    neighbors = g.neighborhood(vertices=node, order=1)[1:]
    if is_contain_empty_industry:
        if node_id[0] != 'C':  # 非cert类型节点
            return neighbors
        else:
            return neighbors[:cert_n]
    else:
        nonempty_neighbors = []
        if node_id[0] != 'C':  # 非cert类型节点
            for i in neighbors:
                if not is_node_empty(i):
                    nonempty_neighbors.append(i)
            return nonempty_neighbors
        else:
            count = 0
            for i in neighbors:
                if not is_node_empty(i):
                    nonempty_neighbors.append(i)
                    count += 1
                    if count == cert_n:
                        break
            return nonempty_neighbors


def get_network(node_id, is_contain_empty_industry: bool = True, cert_n: int = 100):
    """
        get the neighbors within three steps for a certain node
    :param node_id: id
    :return: list of the indexes of the neighbors
    """
    node_index = [get_node(node_id).index]
    neighbors = get_neighbors(node_id, True, cert_n)
    neighbors_layer1 = neighbors  # 一层邻居节点
    neighbors_layer2 = []  # 二层邻居节点
    neighbors_layer3 = []  # 三层邻居节点
    print(neighbors)
    for i in neighbors:
        print(str(i) + ' start')
        i_id = g.vs[i]['id']
        relation = g.es.find(_within=[get_node(node_id).index, i])['relation']
        if 4 <= links_all.index(relation) <= 6:  # 边强度较强，再挖掘一层
            m1 = get_neighbors(i_id, is_contain_empty_industry, cert_n)
            neighbors_layer2 += m1
        elif 1 <= links_all.index(relation) <= 3:  # 边强度很强，挖掘两层
            m1 = get_neighbors(i_id, is_contain_empty_industry, cert_n)  # 第一层
            neighbors_layer2 += m1
            for j in m1:
                j_id = g.vs[j]['id']
                relation_neighbor = g.es.find(_within=[i, j])['relation']
                if 1 <= links_all.index(relation_neighbor) <= 6:  # 此处cert类型邻居太多，不做考虑，一二层邻居间关系一般或较弱也不做考虑
                    m2 = get_neighbors(j_id, is_contain_empty_industry, cert_n)  # 第二层
                    neighbors_layer3 += m2
        elif links_all.index(relation) == 0:  # cert类型，邻居太多，单独考虑，只取前cert_n个
            m1 = get_neighbors(i_id, is_contain_empty_industry, cert_n)
            neighbors_layer2 += m1
            # m1 = get_neighbors(i_id, False, cert_n)
            # neighbors_layer2 += m1
            # for j in m1:
            #     j_id = g.vs[j]['id']
            #     relation_neighbor = g.es.find(_within=[i, j])['relation']
            #     if 1 <= links_all.index(relation_neighbor) <= 6:  # 此处cert类型邻居太多，不做考虑，一二层邻居间关系一般或较弱也不做考虑
            #         m2 = get_neighbors(j_id, False, cert_n)  # 第二层
            #         neighbors_layer3 += m2
        print(str(i) + ' finish')

    neighbors_all = node_index + neighbors_layer1 + neighbors_layer2 + neighbors_layer3
    neighbors_all_set = set(neighbors_all)  # 转为set类型，过滤重复节点
    return neighbors_all_set


def is_center(fig, node):
    neighbors = fig.neighborhood(vertices=node, order=1)[1:]
    num = len(neighbors)
    num_weak = 0
    for j in neighbors:
        relation = fig.es.find(_within=[node.index, j])['relation']
        if links_all.index(relation) >= 7:
            num_weak += 1
            if num_weak > 0.5 * num:
                return False
        if get_type(node['id']) == 'IP' and get_type(fig.vs[j]['id']) == 'Domain':
            num_IP = 0
            for k in fig.vs[j].neighbors():
                if get_type(k['id']) == 'IP':
                    num_IP += 1
                    if num_IP == 2:
                        return False
    return True


def get_center(fig):
    centers = fig.vs.select(_degree_ge=fig.maxdegree() * 0.25)
    res_centers = []
    res_centers_idx = []
    res_centers_id = []
    for i in range(len(centers['id'])):
        if is_center(fig, centers[i]):
            res_centers.append(centers[i])
            res_centers_id.append(centers[i]['id'])
            res_centers_idx.append(centers[i].index)
    return res_centers, res_centers_idx, res_centers_id


def key_line(fig, centers_idx: list):
    path_id = []
    length = len(centers_idx)
    for i in range(length-1):
        for j in range(i+1, len(centers_idx)):
            path = fig.get_all_shortest_paths(centers_idx[i], to=centers_idx[j], mode='all')
            if len(path[0]) < 5:
                for k in path:
                    path_id.append([fig.vs[m]['id'] for m in k])
    return path_id


def operate(test_num: int, is_contain_empty_industry: bool, cert_n: int):
    test_nodes = samples[test_num-1]
    set_all = set()
    for test_node in test_nodes:
        set_all = set_all | get_network(test_node, is_contain_empty_industry=is_contain_empty_industry, cert_n=cert_n)

    print(len(set_all))

    #  在Node.csv文件中查找相应id的节点，对属性进行设置
    node_list = list(set_all)
    fig = g.subgraph(node_list)
    name_list, type_list, industry_list = return_by_id(fig.vs['id'])
    fig.vs['name'] = name_list
    fig.vs['type'] = type_list
    fig.vs['industry'] = industry_list
    print(len(fig.es))  # 边数量

    # ig.plot(fig)
    centerNodes, centerNodes_idx, centerNodes_id = get_center(fig)
    key_lines = key_line(fig, centerNodes_idx)
    print(centerNodes_id)
    print(key_lines)

    # 存储
    # node
    df_nodes = pd.DataFrame([fig.vs['id'], fig.vs['name'], fig.vs['type'], fig.vs['industry']]).T
    df_nodes.columns = ['id', 'name', 'type', 'industry']
    df_nodes.to_csv('./output/sample_'+str(test_num)+'_nodes_('+str(is_contain_empty_industry)+'_'+str(cert_n)+').csv',
                    sep=',', index=False)

    # link
    df_links = []
    for i in range(len(fig.es)):
        df_links.append([fig.vs[fig.es[i].source]['id'], fig.vs[fig.es[i].target]['id']])
    df_links = pd.DataFrame(df_links)
    df_links.columns = ['source', 'target']
    df_links.to_csv('./output/sample_'+str(test_num)+'_links_('+str(is_contain_empty_industry)+'_'+str(cert_n)+').csv',
                    sep=',', index=False)

    # centerNode
    df_centerNodes = pd.DataFrame(centerNodes_id)
    df_centerNodes.to_csv('./output/sample_'+str(test_num)+'_centerNodes_('+str(is_contain_empty_industry)+'_'+
                          str(cert_n)+').csv', sep=',', header=False, index=False)

    # key_lines
    df_keylines = pd.DataFrame(key_lines)
    df_keylines = df_keylines.where(df_keylines.notnull(), None)
    df_keylines.to_csv('./output/sample_'+str(test_num)+'_keyLines_('+str(is_contain_empty_industry)+'_'+
                          str(cert_n)+').csv', sep=',', header=False, index=False)



# set_all = set()
# for test_node in test_nodes:
#     set_all = set_all | get_network(test_node, is_contain_empty_industry=True, cert_n=100)
#
# print(len(set_all))  # 节点数量
#
# #  在Node.csv文件中查找相应id的节点，对属性进行设置
# node_list = list(set_all)
# fig = g.subgraph(node_list)
# name_list, type_list, industry_list = return_by_id(fig.vs['id'])
# fig.vs['name'] = name_list
# fig.vs['type'] = type_list
# fig.vs['industry'] = industry_list
# print(len(fig.es))  # 边数量
#
#
# ig.plot(fig)
# centerNodes, centerNodes_idx = get_center()
# key_lines = key_line(centerNodes_idx)
# print(centerNodes)
# print(key_lines)

time2 = time.time()
operate(1, True, 100)

time3 = time.time()
print('Time: ', time3 - time1)
print('Time for initializing: ', time2 - time1)
print('Time for operating: ', time3 - time2)
