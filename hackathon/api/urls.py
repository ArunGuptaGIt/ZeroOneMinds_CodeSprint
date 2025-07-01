from django.urls import path
from . import views

urlpatterns = [
    path('signup/',views.UserSignup,name='UserSignup'),
    path('login/',views.UserLogin,name='UserLogin'),
    path('storage/',views.StorageMethods,name='StorageMethods'),
    path('storage/vendor_items',views.GetItemsForVendors,name='GetItemsForVendors'),
    path('storage/farmers_items',views.GetItemsForFarmers,name='GetItemsForFarmers'),
    path('storage/update_delete_item/<int:item_id>',views.UpdateDeleteItem,name='UpdateDeleteItem'),

]
