import unittest

from support import run_solution


class IdentifyTheMistakeReverseOrderTest(unittest.TestCase):
    def test_case_01_three_pairs(self):
        """three pairs."""
        result = run_solution('identify-the-mistake-reverse-order', '1,2,3\n4,5,6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 6\n2 5\n3 4\n')

    def test_case_02_two_pairs(self):
        """two pairs."""
        result = run_solution('identify-the-mistake-reverse-order', 'a,b\nx,y\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'a y\nb x\n')


if __name__ == "__main__":
    unittest.main()
