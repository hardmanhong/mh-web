/**
 * 根据 jsonSchema 自动生成 🍺
 * 请勿修改
 * 聚宝盆 API
 * version: v1
 */
import request from '@/api/request'

export interface UserDto {
  /** 用户名 */
  name: string
  /** 密码 */
  password: string
}

export interface ChangePasswordUserDto {
  /** 用户名 */
  name: string
  /** 密码 */
  password: string
  /** 新密码 */
  newPassword: string
}

export interface GoodsDto {
  /** ID */
  id: number
  /** 名称 */
  name: string
  /** 最低价 */
  minPrice: number
  /** 最高价 */
  maxPrice: number
  /** 备注 */
  remark: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

export interface PaginationModel {
  /** 总条数 */
  total: number
  /** 页码 */
  page: number
  /** 每页数量 */
  pageSize: number
}

export interface CreateGoodsDto {
  /** 名称 */
  name: string
  /** 最低价 */
  minPrice: number
  /** 最高价 */
  maxPrice: number
}

export interface UpdateGoodsDto {
  /** 名称 */
  name: string
  /** 最低价 */
  minPrice: number
  /** 最高价 */
  maxPrice: number
}

export interface SellDto {
  /** ID */
  id: number
  /** 商品ID */
  goodsId: number
  /** 卖出价 */
  price: number
  /** 卖出数量 */
  quantity: number
  /** 单个利润 */
  profit: number
  /** 备注 */
  remark: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

export interface BuyDto {
  /** ID */
  id: number
  /** 商品ID */
  goodsId: number
  /** 买入价 */
  price: number
  /** 买入数量 */
  quantity: number
  /** 库存数量 */
  inventory: number
  /** 是否卖出 0 未卖出 1 卖出 */
  hasSold: number
  /** 总金额 */
  totalAmount: number
  /** 总利润 */
  totalProfit: number
  /** 备注 */
  remark: string
  /** 商品 */
  goods: GoodsDto
  /** 卖出记录 */
  sales: SellDto[]
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

export interface CreateBuyDto {
  /** 商品ID */
  goodsId: number
  /** 买入价 */
  price: number
  /** 买入数量 */
  quantity: number
  /** 备注 */
  remark: string
}

export interface UpdateBuyDto {
  /** 买入价 */
  price: number
  /** 买入数量 */
  quantity: number
  /** 备注 */
  remark: string
}

export interface CreateSellDto {
  /** 商品ID */
  goodsId: number
  /** 卖出价 */
  price: number
  /** 卖出数量 */
  quantity: number
  /** 备注 */
  remark: string
  /** 买入ID */
  buyId: number
}

export interface UpdateSellDto {
  /** 卖出价 */
  price: number
  /** 卖出数量 */
  quantity: number
  /** 备注 */
  remark: string
  /** 买入ID */
  buyId: number
}

export interface StatisticsDto {
  /** 总库存 */
  totalInventory: string
  /** 总利润 */
  totalProfit: string
}

export interface BusinessItem {
  /** 日期 */
  date: string
  /** 数值 */
  value: number
  /** 类型 */
  name: string
}

export interface BusinessDto {
  /** 买入 */
  buyList: BusinessItem[]
  /** 卖出 */
  sellList: BusinessItem[]
  /** 利润 */
  profitList: BusinessItem[]
}

export interface InventoryDto {
  /** 商品ID */
  goodsId: number
  /** 商品名称 */
  goodsName: number
  /** 库存数量 */
  totalInventory: number
}

export interface AccountDto {
  /** 账户ID */
  id: number
  /** 账户名 */
  name: string
  /** 服务器 */
  server: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

export interface CreateAccountDto {
  /** 账户名 */
  name: string
  /** 服务器 */
  server: string
}

export interface UpdateAccountDto {
  /** 账户名 */
  name: string
  /** 服务器 */
  server: string
}

export interface EquipmentDto {
  /** ID */
  id: number
  /** 角色ID */
  characterID: number
  /** 武器 */
  arms: string
  /** 头盔 */
  helmet: string
  /** 项链 */
  necklace: string
  /** 衣服 */
  clothes: string
  /** 腰带 */
  belt: string
  /** 鞋子 */
  shoe: string
  /** 戒指 */
  ring: string
  /** 手镯 */
  bracelet: string
  /** 耳饰 */
  earring: string
  /** 佩饰 */
  trimming: string
  /** 备注 */
  remark: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

export interface PetDto {
  /** ID */
  id: number
  /** 角色ID */
  characterID: number
  /** 名称 */
  name: string
  /** 价格 */
  price: number
  /** 等级 */
  level: number
  /** 备注 */
  remark: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

export interface CharacterDto {
  /** ID */
  id: number
  /** accountId */
  accountId: number
  /** 昵称 */
  name: string
  /** 造型 */
  molding: string
  /** 门派 */
  sect: string
  /** 等级 */
  level: string
  /** 备注 */
  remark: string
  /** 账号 */
  account: AccountDto
  /** 装备 */
  equipment: EquipmentDto
  /** 宠物 */
  pets: PetDto[]
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

export interface CreateCharacterDto {
  /** accountId */
  accountId: number
  /** 昵称 */
  name: string
  /** 造型 */
  molding: string
  /** 门派 */
  sect: string
  /** 等级 */
  level: string
  /** 备注 */
  remark: string
  /** 装备 */
  equipment: EquipmentDto
  /** 宠物 */
  pets: PetDto[]
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

export interface UpdateCharacterDto {
  /** ID */
  id: number
  /** accountId */
  accountId: number
  /** 昵称 */
  name: string
  /** 造型 */
  molding: string
  /** 门派 */
  sect: string
  /** 等级 */
  level: string
  /** 备注 */
  remark: string
  /** 装备 */
  equipment: EquipmentDto
  /** 宠物 */
  pets: PetDto[]
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

export interface IncomeExpensesDto {
  /** ID */
  id: number
  /** 类型 1 收入 2 支出 */
  type: number
  /** 分类  1 点卡 2 金币 3 装备 4 宝宝 5 其他 */
  category: number
  /** 金额 */
  amount: number
  /** 日期 */
  date: string
  /** 备注 */
  remark: string
}

export interface CreateIncomeExpensesDto {
  /** 类型 1 收入 2 支出 */
  type: number
  /** 分类  1 点卡 2 金币 3 装备 4 宝宝 5 其他 */
  category: number
  /** 金额 */
  amount: number
  /** 日期 */
  date: string
  /** 备注 */
  remark: string
}

export interface UpdateIncomeExpensesDto {
  /** ID */
  id: number
  /** 类型 1 收入 2 支出 */
  type: number
  /** 分类  1 点卡 2 金币 3 装备 4 宝宝 5 其他 */
  category: number
  /** 金额 */
  amount: number
  /** 日期 */
  date: string
  /** 备注 */
  remark: string
}

export interface PostDto {
  /** ID */
  id: number
  /** 标题 */
  title: string
  /** 内容 */
  content: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

export interface CreatePostDto {
  /** 标题 */
  title: string
  /** 内容 */
  content: string
}

export interface UpdatePostDto {
  /** 标题 */
  title: string
  /** 内容 */
  content: string
}

/** 登录 */
export function userLogin(userDto: UserDto): Promise<string> {
  return request({ url: `/user/login`, method: 'post', data: userDto })
}

/** 注册 */
export function userRegister(userDto: UserDto): Promise<null> {
  return request({ url: `/user/register`, method: 'post', data: userDto })
}

/** 修改密码 */
export function userChangePassword(
  changePasswordUserDto: ChangePasswordUserDto
): Promise<null> {
  return request({
    url: `/user/changePassword`,
    method: 'post',
    data: changePasswordUserDto
  })
}

/** 查询商品列表 */
export function goodsFindAll(params: {
  page?: number
  pageSize?: number
  name?: string
}): Promise<PaginationModel & { list: GoodsDto[] }> {
  return request({ url: `/goods`, method: 'get', params })
}

/** 创建商品 */
export function goodsCreate(createGoodsDto: CreateGoodsDto): Promise<number> {
  return request({ url: `/goods`, method: 'post', data: createGoodsDto })
}

/** 查询商品 */
export function goodsFindOne(id: number): Promise<GoodsDto> {
  return request({ url: `/goods/${id}`, method: 'get' })
}

/** 更新商品 */
export function goodsUpdate(
  id: number,
  updateGoodsDto: UpdateGoodsDto
): Promise<number> {
  return request({ url: `/goods/${id}`, method: 'put', data: updateGoodsDto })
}

/** 删除商品 */
export function goodsRemove(id: number): Promise<null> {
  return request({ url: `/goods/${id}`, method: 'delete' })
}

/** 查询买入列表 */
export function buyFindAll(params: {
  page?: number
  pageSize?: number
  goodsIds?: string[]
  startAt?: string
  endAt?: string
  order: { inventory: 'ASC' | 'DESC'; hasSold: 'ASC' | 'DESC' }
}): Promise<
  PaginationModel & {
    list: BuyDto[]
    totalAmount: number
    totalProfit: number
    totalInventory: number
  }
> {
  return request({ url: `/buy`, method: 'get', params })
}

/** 创建买入记录 */
export function buyCreate(createBuyDto: CreateBuyDto): Promise<number> {
  return request({ url: `/buy`, method: 'post', data: createBuyDto })
}

/** 查询买入记录 */
export function buyFindOne(id: number): Promise<BuyDto> {
  return request({ url: `/buy/${id}`, method: 'get' })
}

/** 更新买入记录 */
export function buyUpdate(
  id: number,
  updateBuyDto: UpdateBuyDto
): Promise<number> {
  return request({ url: `/buy/${id}`, method: 'put', data: updateBuyDto })
}

/** 删除买入记录 */
export function buyRemove(id: number): Promise<null> {
  return request({ url: `/buy/${id}`, method: 'delete' })
}

/** 创建卖出记录 */
export function sellCreate(createSellDto: CreateSellDto): Promise<number> {
  return request({ url: `/sell`, method: 'post', data: createSellDto })
}

/** 更新卖出记录 */
export function sellUpdate(
  id: number,
  updateSellDto: UpdateSellDto
): Promise<number> {
  return request({ url: `/sell/${id}`, method: 'put', data: updateSellDto })
}

/** 删除卖出记录 */
export function sellRemove(id: number): Promise<null> {
  return request({ url: `/sell/${id}`, method: 'delete' })
}

/** 统计 */
export function statisticsGetStatistics(): Promise<StatisticsDto> {
  return request({ url: `/statistics`, method: 'get' })
}

/** 统计图 */
export function statisticsGetBusiness(params: {
  type?: string
}): Promise<BusinessDto> {
  return request({ url: `/statistics/business`, method: 'get', params })
}

/** 库存图 */
export function statisticsGetInventory(): Promise<InventoryDto[]> {
  return request({ url: `/statistics/inventory`, method: 'get' })
}

/** 查询账号列表 */
export function accountFindAll(): Promise<AccountDto[]> {
  return request({ url: `/account`, method: 'get' })
}

/** 创建账号 */
export function accountCreate(
  createAccountDto: CreateAccountDto
): Promise<number> {
  return request({ url: `/account`, method: 'post', data: createAccountDto })
}

/** 查询账号 */
export function accountFindOne(id: number): Promise<AccountDto> {
  return request({ url: `/account/${id}`, method: 'get' })
}

/** 更新账号 */
export function accountUpdate(
  id: number,
  updateAccountDto: UpdateAccountDto
): Promise<number> {
  return request({
    url: `/account/${id}`,
    method: 'put',
    data: updateAccountDto
  })
}

/** 删除账号 */
export function accountRemove(id: number): Promise<null> {
  return request({ url: `/account/${id}`, method: 'delete' })
}

/** 查询角色列表 */
export function characterFindAll(): Promise<CharacterDto[]> {
  return request({ url: `/character`, method: 'get' })
}

/** 创建角色 */
export function characterCreate(
  createCharacterDto: CreateCharacterDto
): Promise<number> {
  return request({
    url: `/character`,
    method: 'post',
    data: createCharacterDto
  })
}

/** 查询角色 */
export function characterFindOne(id: number): Promise<CharacterDto> {
  return request({ url: `/character/${id}`, method: 'get' })
}

/** 更新角色 */
export function characterUpdate(
  id: number,
  updateCharacterDto: UpdateCharacterDto
): Promise<number> {
  return request({
    url: `/character/${id}`,
    method: 'put',
    data: updateCharacterDto
  })
}

/** 删除角色 */
export function characterRemove(id: number): Promise<null> {
  return request({ url: `/character/${id}`, method: 'delete' })
}

/** 查询收支列表 */
export function incomeExpensesFindAll(params: {
  page?: number
  pageSize?: number
  type?: number
  category?: number
}): Promise<
  PaginationModel & {
    list: IncomeExpensesDto[]
    income: number
    expenses: number
    surplus: number
  }
> {
  return request({ url: `/income-expenses`, method: 'get', params })
}

/** 创建收支 */
export function incomeExpensesCreate(
  createIncomeExpensesDto: CreateIncomeExpensesDto
): Promise<IncomeExpensesDto> {
  return request({
    url: `/income-expenses`,
    method: 'post',
    data: createIncomeExpensesDto
  })
}

/** 查询收支 */
export function incomeExpensesFindOne(
  id: number
): Promise<PaginationModel & { list: IncomeExpensesDto[] }> {
  return request({ url: `/income-expenses/${id}`, method: 'get' })
}

/** 更新收支 */
export function incomeExpensesUpdate(
  id: number,
  updateIncomeExpensesDto: UpdateIncomeExpensesDto
): Promise<IncomeExpensesDto> {
  return request({
    url: `/income-expenses/${id}`,
    method: 'put',
    data: updateIncomeExpensesDto
  })
}

/** 删除收支 */
export function incomeExpensesRemove(id: number): Promise<null> {
  return request({ url: `/income-expenses/${id}`, method: 'delete' })
}

/** 查询文章列表 */
export function postFindAll(params: {
  page?: number
  pageSize?: number
  title?: string
}): Promise<PaginationModel & { list: PostDto[] }> {
  return request({ url: `/post`, method: 'get', params })
}

/** 创建文章 */
export function postCreate(createPostDto: CreatePostDto): Promise<number> {
  return request({ url: `/post`, method: 'post', data: createPostDto })
}

/** 查询文章 */
export function postFindOne(id: number): Promise<PostDto> {
  return request({ url: `/post/${id}`, method: 'get' })
}

/** 更新文章 */
export function postUpdate(
  id: number,
  updatePostDto: UpdatePostDto
): Promise<PostDto> {
  return request({ url: `/post/${id}`, method: 'put', data: updatePostDto })
}

/** 删除文章 */
export function postRemove(id: number): Promise<null> {
  return request({ url: `/post/${id}`, method: 'delete' })
}
