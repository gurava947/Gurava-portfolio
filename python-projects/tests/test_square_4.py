import unittest

from support import run_solution


class Square4Test(unittest.TestCase):
    def test_case_01_n_3(self):
        """N = 3."""
        result = run_solution('square-4', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0 0 0 \n1 1 1 \n2 2 2 \n')

    def test_case_02_n_2(self):
        """N = 2."""
        result = run_solution('square-4', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0 0 \n1 1 \n')


if __name__ == "__main__":
    unittest.main()
