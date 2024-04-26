import rclpy
import threading
from rclpy.executors import MultiThreadedExecutor
from rclpy.executors import SingleThreadedExecutor
from ros2_ws.py_pubsub.py_pubsub.publisher_member_function import MinimalPublisher
from ros2_ws.py_pubsub.py_pubsub.subscriber_member_function import MinimalSubscriber

def create_thread_pulisher(operation):
    t1=threading.Thread(target=create_publisher,args=[operation])
    t1.start()
    #t1.join()

def create_publisher(operation):
    #rclpy.init()
    publish_node=MinimalPublisher(operation)


    rclpy.spin(publish_node)

    publish_node.destroy_node()
    
    rclpy.shutdown()