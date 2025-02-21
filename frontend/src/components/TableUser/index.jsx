import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { GrFormClose } from 'react-icons/gr';
import { MdContentCopy } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  FileExcelOutlined,
  MoreOutlined,
  ReloadOutlined,
  SearchOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { ExportTableButton, SearchTableInput, Table } from 'ant-table-extensions';
import {
  Button,
  DatePicker,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Popconfirm,
  Select,
  Space,
  Tag,
  Tooltip,
} from 'antd';
import axios from 'axios';
import { Timestamp, collection, getDocs } from 'firebase/firestore';
import moment from 'moment';

import { Spinner } from 'components/Spinner';

import { UserAuth } from '../../context/AuthContext';
import { storage } from '../../utils/firebase';
import useCopyToClipboard from './../../hooks/useCopyToClipboard';
import './style.css';

const { Option } = Select;

export default function TableUser() {
  const {
    user,
    GetAllUser,
    DeleteUser,
    updateUserByAdmin,
    AddUserToDBByAdmin,
    getNewUserInCurrentMonth,
  } = UserAuth();
  const [tableLoading, setTableLoading] = React.useState(true);
  const [userRecord, setUserRecord] = React.useState({});
  const [newUserInCurrentMonth, setNewUserInCurrentMonth] = React.useState([]);
  const [copyToClipboard] = useCopyToClipboard();
  const [loadingCreate, setLoadingCreate] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [listUsers, setListUsers] = React.useState();
  const [additionInfo, setAdditionInfo] = React.useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [size, setSize] = useState('large');
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [tableToolTip, setTableToolTip] = useState(false);
  const [form] = Form.useForm();
  const { token, forgotPassword } = UserAuth();
  const [searchDataSource, setSearchDataSource] = React.useState(listUsers);
  const { t, i18n } = useTranslation();
  const [openModalMultiDelete, setOpenModalMultiDelete] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalResetPassword, setOpenModalResetPassword] = useState(false);
  const [confirmLoadingModal, setConfirmLoadingModal] = useState(false);
  const [confirmLoadingModalDelete, setConfirmLoadingModalDelete] = useState(false);
  const [confirmLoadingModalResetPassword, setConfirmLoadingModalResetPassword] = useState(false);
  const API = process.env.REACT_APP_API;

  useEffect(() => {
    // newUserMonthly();
    getAllUserData();
  }, []);

  const SendResetPassword = async () => {
    setConfirmLoadingModalResetPassword(true);
    try {
      await forgotPassword(selectedUser?.email);
      toast.success(t('Password reset email has been sent'));

      setOpenModalResetPassword(false);
      setConfirmLoadingModalResetPassword(false);
    } catch (e) {
      toast.error(t('Sorry, an error has occurred'));
      console.log(e.message);
      setConfirmLoadingModalResetPassword(false);
      setOpenModalResetPassword(false);
    }
  };

  // const newUserMonthly = async () => {
  // 	const data = await getNewUserInCurrentMonth();
  // 	setNewUserInCurrentMonth(data);
  // };

  const showModalMultiDelete = () => {
    setOpenModalMultiDelete(true);
  };

  const handleOkModal = () => {
    setConfirmLoadingModal(true);
    handleDeleteMultipleUser();
    setOpenModalMultiDelete(false);
  };

  const handleDeleteModal = user => {
    setSelectedUser(user);
    setOpenModalDelete(true);
  };

  const handleSendResetPassword = user => {
    setSelectedUser(user);
    setOpenModalResetPassword(true);
  };

  const handleCancelModalMultiDelete = () => {
    setOpenModalMultiDelete(false);
  };

  const handleOpenUpdateUser = record => {
    setUserRecord(record);
    setOpenUpdate(true);
  };

  const handleOpenCreateUser = () => {
    setOpenCreate(true);
  };
  const onSelectChange = newSelectedRowKeys => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinishUpdate = async value => {
    setLoading(true);
    try {
      await updateUserByAdmin(userRecord?.id, value);
      setLoading(false);
      toast.success(t('Update Profile Success'));
      getAllUserData();
      setOpenUpdate(false);
    } catch (e) {
      toast.error(t('Something went wrong! please try again'));
      console.log(e.message);
      setLoading(false);
    }
  };
  useEffect(() => form.resetFields(), [userRecord, openCreate]);

  const fullWidth = global.window.innerWidth;

  const onCloseUpdateUser = () => {
    setUserRecord({});
    setOpenUpdate(false);
  };

  const onCloseCreateUser = () => {
    setOpenCreate(false);
  };

  const fetchDeleteData = async (token, id) => {
    try {
      const res = await axios.delete(`${API}/user/${id}`);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCreateData = async (token, value) => {
    try {
      const res = await axios.post(`http://localhost:3001/api/user/`, value);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    setConfirmLoadingModalDelete(true);

    try {
      await DeleteUser(selectedUser?.id);
      fetchDeleteData(token, selectedUser?.id);
      setListUsers(listUsers.filter(item => item.id !== selectedUser?.id));
      setSearchDataSource(searchDataSource.filter(item => item.id !== selectedUser?.id));
      setConfirmLoadingModalDelete(false);
      setOpenModalDelete(false);
      toast.success(t('Delete Success'));
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishCreateUser = async value => {
    setLoadingCreate(true);
    try {
      const uid = await fetchCreateData(token, value);
      AddUserToDBByAdmin(uid, value);
      setOpenUpdate(false);
      setLoadingCreate(false);
      setOpenCreate(false);
      toast.success(t('Create user success'));
      getAllUserData();
    } catch (e) {
      toast.error(t('The email already in use'));
      console.log(e);
      setLoadingCreate(false);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleDeleteMultipleUser = () => {
    setListUsers(listUsers.filter(item => !selectedRowKeys.includes(item.id)));
    setSearchDataSource(searchDataSource.filter(item => !selectedRowKeys.includes(item.id)));
    toast.success(t('Delete Success'));
  };

  const columns = [
    {
      title: t('Name'),
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      defaultSortOrder: 'descend',
    },

    {
      title: t('Phone Number'),
      dataIndex: 'phone',
      key: 'phone',
      width: 210,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 210,
      ellipsis: true,
      render: email => (
        <Tooltip placement="top" title={email} showArrow={false}>
          {email}
        </Tooltip>
      ),
    },
    {
      title: t('Tags'),
      dataIndex: 'tag',
      key: 'tag',
      render: tag => tag.map(_ => <Tag color={_?.length > 5 ? 'cyan' : 'gold'}>{_}</Tag>),
    },
    {
      title: t('Gender'),
      dataIndex: 'gender',
      key: 'gender',
      render: text => <p>{t(text)}</p>,
    },
    {
      title: t('Role'),
      dataIndex: 'role',
      key: 'role',
      render: text => <p>{t(text)}</p>,
    },

    {
      title: t('ID'),
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
    },
    {
      width: 110,
      title: t(''),
      // fixed: 'right',
      key: 'action',
      render: (_, record) => {
        const menu = (
          <Menu
            items={[
              {
                key: '1',
                label: (
                  <Button type="text" key="update" onClick={() => handleOpenUpdateUser(record)}>
                    {t('Update account')}
                  </Button>
                ),
              },
              {
                key: '2',
                label: (
                  <Button type="text" key="update" onClick={() => handleSendResetPassword(record)}>
                    {t('Reset Password')}
                  </Button>
                ),
              },
              {
                key: '3',
                label: (
                  <Button type="text" ghost onClick={() => handleDeleteModal(record)}>
                    {t('Delete account')}
                  </Button>
                ),
              },
            ]}
          />
        );

        return (
          <>
            <Space size="small" className="table_actions">
              <Tooltip
                placement="bottom"
                title={t('Copy UID')}
                showArrow={false}
                align={{ offset: [0, -5] }}
              >
                <Button
                  ghost
                  type="link"
                  icon={<MdContentCopy color="black" />}
                  onClick={() => copyToClipboard(record.id)}
                />
              </Tooltip>

              <Dropdown overlay={menu}>
                <Button ghost type="link" icon={<BiDotsVerticalRounded color="black" />} />
              </Dropdown>
            </Space>
          </>
        );
      },
    },
  ];
  const getAllUserData = async () => {
    setTableLoading(true);

    const list = [];
    try {
      const users = await GetAllUser();
      users.forEach(doc => {
        list.push({ id: doc.id, ...doc.data(), key: doc.id });
      });
      setListUsers(list);
      setSearchDataSource(list);
      setTableLoading(false);
    } catch (error) {
      toast.error(t('Fail to load user data'));
      setTableLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <section className="tableuser-header">
        <section className="tableuser_leftheader">
          <h2 className="tableuser-header-title">{t('management users')}</h2>
          <Button
            icon={<MoreOutlined style={{ fontSize: 20 }} />}
            onClick={() => setTableToolTip(!tableToolTip)}
            type="text"
          ></Button>
        </section>
        <section className="tableuser_rightheader">
          <SearchTableInput
            columns={columns}
            dataSource={listUsers}
            setDataSource={setSearchDataSource}
            inputProps={{
              placeholder: t('Name, ID, Email, Tag, '),
              prefix: <SearchOutlined />,
            }}
          />
          <Button
            className="tableuser_createbutton"
            loading={loadingCreate}
            type="primary"
            onClick={handleOpenCreateUser}
          >
            {t('Create User')}
          </Button>
          <Button
            icon={<ReloadOutlined rotate={50} style={{ fontSize: 14 }} />}
            onClick={() => getAllUserData()}
            type="text"
          ></Button>
        </section>
      </section>
      <Drawer
        title={t('Update')}
        width={fullWidth >= 1000 ? '878px' : fullWidth}
        onClose={onCloseUpdateUser}
        open={openUpdate}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        {openUpdate ? (
          <Form
            form={form}
            validateTrigger="onBlur"
            labelCol={{ span: 4 }}
            name="update user"
            size={'large'}
            initialValues={{
              name: userRecord?.name,
              phone: userRecord?.phone,
              gender: userRecord?.gender,
              dob: moment(userRecord?.dob?.toDate()),
              email: userRecord?.email,
              role: userRecord?.role,
              tag: userRecord?.tag,
            }}
            onFinish={onFinishUpdate}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item
              label={t('Name')}
              name="name"
              rules={[
                {
                  required: true,
                  message: t('Please input your username!'),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="dob" label={t('Date of Birth')}>
              <DatePicker
                disabledDate={current => current > moment()}
                format={i18n.language === 'vi_VN' ? 'DD-MM-YYYY' : null}
              />
            </Form.Item>
            <Form.Item name="gender" label={t('Gender')}>
              <Select>
                <Option value="male">{t('Male')}</Option>
                <Option value="female">{t('Female')}</Option>
                <Option value="other">{t('Other')}</Option>
              </Select>
            </Form.Item>
            <Form.Item name="role" label={t('Role')}>
              <Select>
                <Option value="user">{t('User')}</Option>
                <Option value="admin" disabled={!user?.role === 'admin'}>
                  {t('Admin')}
                </Option>
                <Option value="manager">{t('Manager')}</Option>
              </Select>
            </Form.Item>
            <Form.Item name="tag" label={t('Tags')}>
              <Select mode="tags">
                <Option value="vip">{t('V.I.P')}</Option>
                <Option value="OCD">{t('O.C.D')}</Option>
              </Select>
            </Form.Item>
            <Form.Item type="number" name="phone" label={t('Phone Number')}>
              <Input
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 16,
              }}
            >
              <Button
                style={{
                  marginInline: 15,
                  height: 'fit-content',
                  fontSize: 16,
                  lineHeight: 1.8,
                  borderRadius: 5,
                  boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
                }}
                onClick={onCloseUpdateUser}
              >
                {t('Close')}
              </Button>
              <Button
                loading={loading}
                style={{
                  height: 'fit-content',
                  fontSize: 16,
                  lineHeight: 1.8,
                  borderRadius: 5,
                  boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
                }}
                type="primary"
                htmlType="submit"
              >
                {t('Confirm')}
              </Button>
            </Form.Item>
          </Form>
        ) : null}
      </Drawer>
      <Drawer
        title={t('Create new user')}
        width={fullWidth >= 1000 ? '878px' : fullWidth}
        onClose={onCloseCreateUser}
        open={openCreate}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        {openCreate ? (
          <Form
            form={form}
            validateTrigger="onBlur"
            labelCol={{ span: 4 }}
            name="Create User"
            size={'medium'}
            initialValues={{}}
            onFinish={onFinishCreateUser}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item
              label={t('Name')}
              name="name"
              rules={[
                {
                  required: true,
                  message: t('Please input your name!'),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('Email')}
              name="email"
              rules={[
                {
                  required: true,
                  message: t('Please enter your email!'),
                },
                {
                  type: 'email',
                  message: t('Invalid enter your email!'),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('Password')}
              name="password"
              rules={[
                {
                  required: true,
                  message: t('Please enter your password!'),
                },
                {
                  min: 6,
                  message: t('Password must be minimum 6 characters.'),
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={t('Confirm Password')}
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t('Please confirm your password!'),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The two passwords that you entered do not match!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Button
              style={{ margin: 15 }}
              type="text"
              onClick={() => setAdditionInfo(!additionInfo)}
            >
              {t('Addition Information')}{' '}
              {additionInfo ? (
                <UpOutlined style={{ fontSize: 12 }} />
              ) : (
                <DownOutlined style={{ fontSize: 12 }} />
              )}
            </Button>
            {additionInfo && (
              <>
                <Form.Item name="dob" label={t('Date of Birth')}>
                  <DatePicker
                    disabledDate={current => current > moment()}
                    format={i18n.language === 'vi_VN' ? 'DD-MM-YYYY' : null}
                  />
                </Form.Item>
                <Form.Item name="gender" label={t('Gender')}>
                  <Select>
                    <Option value="male">{t('Male')}</Option>
                    <Option value="female">{t('Female')}</Option>
                    <Option value="other">{t('Other')}</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="role" label={t('Role')}>
                  <Select>
                    <Option value="user">{t('User')}</Option>
                    <Option value="admin" disabled={!user?.role === 'admin'}>
                      {t('Admin')}
                    </Option>
                    <Option value="Manager">{t('Manager')}</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="tag" label={t('Tags')}>
                  <Select mode="tags">
                    <Option value="vip">{t('V.I.P')}</Option>
                    <Option value="OCD">{t('O.C.D')}</Option>
                  </Select>
                </Form.Item>
                <Form.Item type="number" name="phone" label={t('Phone Number')}>
                  <Input
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>
              </>
            )}

            <Form.Item className="flex_end">
              <Button
                style={{
                  marginInline: 15,
                  height: 'fit-content',
                  fontSize: 16,
                  lineHeight: 1.8,
                  borderRadius: 5,
                  boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
                }}
                onClick={onCloseCreateUser}
              >
                {t('Close')}
              </Button>
              <Button
                loading={loadingCreate}
                style={{
                  height: 'fit-content',
                  fontSize: 16,
                  lineHeight: 1.8,
                  borderRadius: 5,
                  boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
                }}
                type="primary"
                htmlType="submit"
              >
                {t('Confirm')}
              </Button>
            </Form.Item>
          </Form>
        ) : null}
      </Drawer>
      {tableToolTip ? (
        <section className="table_tooltip">
          <Select
            bordered={false}
            defaultValue="large"
            style={{
              width: 100,
            }}
            onChange={setSize}
          >
            <Option value="small"> {t('Small')}</Option>
            <Option value="middle">{t('Medium')}</Option>
            <Option value="large">{t('Large')}</Option>
          </Select>

          <ExportTableButton
            dataSource={listUsers}
            columns={columns}
            btnProps={{
              type: 'primary',
              icon: <FileExcelOutlined />,
            }}
            showColumnPicker
          >
            {t('Export')}
          </ExportTableButton>
        </section>
      ) : null}
      <Modal
        width={400}
        closable={false}
        footer={null}
        onCancel={() => setOpenModalMultiDelete(false)}
        open={openModalMultiDelete}
        confirmLoading={confirmLoadingModal}
      >
        <section>
          <h6 style={{ fontWeight: 700, fontSize: 16 }}>
            {t('Delete')} {selectedRowKeys.length} {t('user')} {t('selected')}?
          </h6>
          <p style={{ fontWeight: 500, fontSize: 14 }}>
            {t('This will permanently remove')} {t('user')}
          </p>
          <section
            style={{
              marginTop: 20,

              display: 'flex',
              gap: 5,
              justifyContent: 'flex-end',
            }}
          >
            <Button onClick={handleCancelModalMultiDelete} style={{ borderRadius: 8 }}>
              {t('Cancel')}
            </Button>
            <Button onClick={handleOkModal} style={{ borderRadius: 8 }} type="primary" danger>
              {t('Delete')}
            </Button>
          </section>
        </section>
      </Modal>

      <Modal
        centered
        width={450}
        closable={false}
        footer={null}
        open={openModalDelete}
        onCancel={() => setOpenModalDelete(false)}
        confirmLoading={confirmLoadingModalDelete}
      >
        <section>
          <h6 style={{ fontWeight: 700, fontSize: 16 }}>{t('Delete account')}</h6>
          <p style={{ fontWeight: 500, fontSize: 14 }}>
            {t(
              'After you have deleted an account, it will be permanently deleted. Accounts cannot be recovered'
            )}
            {'. '}
          </p>
          <span>
            {t('Account email')}
            {': '}
          </span>
          <b>{selectedUser?.email}</b>

          <section
            style={{
              marginTop: 20,
              display: 'flex',
              gap: 5,
              justifyContent: 'flex-end',
            }}
          >
            <Button onClick={() => setOpenModalDelete(false)} style={{ borderRadius: 8 }}>
              {t('Cancel')}
            </Button>
            <Button
              loading={confirmLoadingModalDelete}
              onClick={handleDeleteUser}
              style={{ borderRadius: 8 }}
              type="primary"
              danger
            >
              {t('Delete')}
            </Button>
          </section>
        </section>
      </Modal>

      <Modal
        centered
        width={450}
        closable={false}
        footer={null}
        onCancel={() => setOpenModalResetPassword(false)}
        open={openModalResetPassword}
        confirmLoading={confirmLoadingModalResetPassword}
      >
        <section>
          <h6
            style={{
              fontWeight: 700,
              fontSize: 18,
              paddingBottom: 10,
            }}
          >
            {t('Reset Password')}
          </h6>
          <p style={{ fontWeight: 500, fontSize: 14 }}>{t('Send a password reset email to')}</p>

          <b>{selectedUser?.email}</b>

          <section
            style={{
              marginTop: 20,
              display: 'flex',
              gap: 5,
              justifyContent: 'flex-end',
            }}
          >
            <Button onClick={() => setOpenModalResetPassword(false)} style={{ borderRadius: 8 }}>
              {t('Cancel')}
            </Button>
            <Button
              loading={confirmLoadingModalResetPassword}
              onClick={SendResetPassword}
              style={{ borderRadius: 8 }}
              type="primary"
            >
              {t('Send')}
            </Button>
          </section>
        </section>
      </Modal>
      {newUserInCurrentMonth.length > 0 ? (
        <section className="newuserStatic">
          <p className="newuserStatic-span">{newUserInCurrentMonth.length}</p>
        </section>
      ) : null}
      {selectedRowKeys.length > 0 ? (
        <section className="table_deletemulpti">
          <span className="table_deletemulpti-span">
            {selectedRowKeys.length} {t('selected')} |
          </span>
          <Button
            type="text"
            onClick={() => setSelectedRowKeys([])}
            className="table_deletemulpti-deselect"
          >
            {t('Deselect')}
          </Button>
          <Button
            danger
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            icon={<AiOutlineClose color="red" style={{ marginRight: 5 }} />}
            onClick={() => showModalMultiDelete()}
            className="table_deletemulpti-delete"
          >
            {t('Delete')}
          </Button>
        </section>
      ) : null}
      <Table
        rowKey={record => record.key}
        rowSelection={rowSelection}
        size={size}
        style={{
          backgroundColor: 'white',
          padding: 20,
          marginBlock: 10,
          borderRadius: 15,
          boxShadow: 'rgb(153 196 227 / 25%) 0px 2px 8px',
        }}
        scroll={{
          x: 1200,
        }}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '30'],
          hideOnSinglePage: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        columns={columns}
        dataSource={searchDataSource || listUsers}
        loading={tableLoading}
      />
    </>
  );
}
