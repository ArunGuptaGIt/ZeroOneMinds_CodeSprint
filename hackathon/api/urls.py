from django.urls import path
from . import views

urlpatterns = [
    path('signup/',views.UserSignup,name='UserSignup'),
    path('login/',views.UserLogin,name='UserLogin'),
    path('storage/',views.StorageMethods,name='StorageMethods'),
    path('storage/items',views.GetItems,name='GetItems'),
    path('storage/update_delete_item/<int:item_id>',views.UpdateDeleteItem,name='UpdateDeleteItem'),
    path('storage/BuyProduct/',views.BuyProduct,name='BuyProduct'),
    path('userdashboard/',views.UserDashboardInfo,name='UserDashboardInfo'),
    path('availableproducts/', views.AvailableProducts, name='available-products'),
    path('addmoney/', views.AddMoney, name='add-money'),

]
